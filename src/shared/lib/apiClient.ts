import { reportClientError } from "@/shared/lib/errorReporter";

function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)trainforge_csrf=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId?: string;

  constructor(status: number, code: string, message: string, requestId?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }
}

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    requestId?: string;
  };
};

export type ApiClientOptions = {
  baseUrl: string;
  credentials?: RequestCredentials;
};

export function createApiClient(options: ApiClientOptions) {
  const { baseUrl, credentials = "include" } = options;

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
    const headers = new Headers(init.headers);
    const method = (init.method ?? "GET").toUpperCase();

    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const csrf = getCsrfToken();
      if (csrf) {
        headers.set("X-CSRF-Token", csrf);
      }
    }

    let response: Response;

    try {
      response = await fetch(url, {
        ...init,
        headers,
        credentials,
        signal: init.signal,
      });
    } catch {
      throw new ApiError(0, "NETWORK", "Network error — check your connection");
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const errorBody = data as ApiErrorBody | null;
      const apiError = new ApiError(
        response.status,
        errorBody?.error?.code ?? "UNKNOWN",
        errorBody?.error?.message ?? response.statusText,
        errorBody?.error?.requestId,
      );
      if (response.status >= 500) {
        reportClientError(apiError, {
          route: path,
          code: apiError.code,
          requestId: apiError.requestId,
        });
      }
      throw apiError;
    }

    return data as T;
  }

  return {
    get: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...init, method: "GET" }),
    post: <T>(path: string, body?: unknown, init?: RequestInit) =>
      request<T>(path, {
        ...init,
        method: "POST",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      }),
    patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
      request<T>(path, {
        ...init,
        method: "PATCH",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      }),
    delete: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...init, method: "DELETE" }),
  };
}

function resolveBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? "/api";
  }
  return process.env.API_URL ?? "http://localhost:2020";
}

export const apiClient = createApiClient({
  baseUrl: resolveBaseUrl(),
});

export type HealthResponse = {
  status: string;
  service: string;
  environment: string;
  timestamp: string;
};

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return apiClient.get<HealthResponse>("/health", { signal });
}

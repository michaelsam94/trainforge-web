type ClientErrorContext = {
  route?: string;
  code?: string;
  requestId?: string;
};

export function reportClientError(error: unknown, context: ClientErrorContext = {}): void {
  const message = error instanceof Error ? error.message : "Unknown client error";
  const payload = {
    level: "error",
    message,
    route: context.route,
    code: context.code,
    requestId: context.requestId,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.error(payload);
    return;
  }

  console.error(JSON.stringify(payload));
}

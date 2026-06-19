import { expect, test } from "@playwright/test";

type RegisterInput = {
  email: string;
  password: string;
  displayName: string;
};

async function registerViaAppProxy(page: import("@playwright/test").Page, input: RegisterInput) {
  await page.goto("/signup");
  await page.waitForLoadState("networkidle");

  await page.evaluate(async (payload) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
  }, input);
}

test.describe("marketing shell", () => {
  test("home and privacy pages load", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "TrainForge" })).toBeVisible();

    await page.getByRole("link", { name: "Privacy" }).first().click();
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Account deletion" })).toBeVisible();
  });
});

test.describe("critical path", () => {
  test("registration opens onboarding", async ({ page }) => {
    const email = `e2e-${Date.now()}@trainforge.test`;

    await registerViaAppProxy(page, {
      email,
      password: "password123",
      displayName: "E2E Runner",
    });

    await page.goto("/onboarding");
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.getByRole("heading")).toBeVisible();
  });

  test("authenticated user reaches community forum", async ({ page }) => {
    const email = `forum-${Date.now()}@trainforge.test`;

    await registerViaAppProxy(page, {
      email,
      password: "password123",
      displayName: "Forum User",
    });

    await page.goto("/community");
    await expect(page.getByRole("heading", { name: "Community" })).toBeVisible();
  });
});

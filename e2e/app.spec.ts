import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context, page }) => {
  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation({ latitude: 53.8008, longitude: -1.5491 });
  await page.goto("http://localhost:5173/");
});

test("has title based of users location", async ({ page, context }) => {
  await expect(page.getByText(/L/)).toBeVisible();
});

test("click on search button fetches weather", async ({ page }) => {
  await page.getByRole("textbox").fill("London");
  await page.getByRole("button").click();

  await expect(page.getByText(/London/)).toBeVisible();
});

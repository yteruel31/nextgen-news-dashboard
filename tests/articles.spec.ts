import { expect, test } from "@playwright/test";
import { database } from "@/db";

test.describe("Save and unsave article", () => {
  test.beforeAll(async () => {
    await database.user.create({
      data: {
        id: "playwright-test",
        email: "playwright@test.com",
        sessions: {
          create: {
            id: "playwright-test",
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          },
        },
        account: {
          create: {
            accountType: "EMAIL",
            password: "password",
            salt: "salt",
          },
        },
        profile: {
          create: {
            displayName: "playwright-test",
          },
        },
      },
    });
  });

  test.afterAll(async () => {
    await database.user.delete({
      where: {
        id: "playwright-test",
      },
      include: {
        sessions: true,
        account: true,
        profile: true,
      },
    });
  });

  test("User can save and unsave article", async ({ page, context }) => {
    await context.addCookies([
      {
        name: "auth_session",
        value: "playwright-test",
        domain: "localhost",
        path: "/",
        httpOnly: true,
      },
    ]);

    await page.routeFromHAR("./tests/hars/articles.har", {
      url: "*/**/api/the-guardian/articles/personalized?pageParam=1",
    });

    await page.goto("http://localhost:3000/feed");

    await page.waitForSelector("text=Article 1");

    await page
      .getByRole("button", { name: "Save" })
      .click({ timeout: 5000, force: true });

    let savedArticle;

    setTimeout(async () => {
      savedArticle = await database.savedArticle.findFirst({
        where: {
          userId: "playwright-test",
          articleId: "article-1",
        },
      });
    });

    expect(savedArticle).not.toBeNull();
  });
});

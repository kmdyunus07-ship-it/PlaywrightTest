import { test, expect } from "@playwright/test";

test("api test get user", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");

  await expect(response.status()).toBe(200);
  console.log(await response.json());
});

test("api test post user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "morpheus",
      job: "leader",
    },
  });

  await expect(response.status()).toBe(201);
  console.log(await response.json());
});

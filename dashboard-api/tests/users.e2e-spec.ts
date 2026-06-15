import request from "supertest";
import { App } from "../src/app.ts";
import { mainData } from "../src/main.ts";

let application: App;

beforeAll(async () => {
  const { app } = await mainData;
  application = app;
});

describe("Users e2e", () => {
  it("Register - error", async () => {
    const res = request(application.app)
      .post("/users/register")
      .send({ email: "a@a.com", password: "123" });
    expect((await res).statusCode).toBe(422);
  });
});

afterAll(() => {
  application.close();
});

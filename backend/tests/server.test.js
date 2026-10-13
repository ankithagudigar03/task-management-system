
const request = require("supertest");
const app = require("../server");

describe("Task Management API", () => {
    test("GET / should return API running message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Task Management API is running"
        );
    });

    test("GET /invalid-route should return 404", async () => {
        const response = await request(app).get("/invalid-route");

        expect(response.statusCode).toBe(404);
    });


test("POST /api/tasks should reject requests without a token", async () => {
    const response = await request(app)
        .post("/api/tasks")
        .send({
            title: "Test Task",
            description: "Testing task creation"
        });

    expect(response.statusCode).toBe(401);
});

test("POST /api/auth/login should reject missing credentials", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
        "Email and password are required"
    );
});


});

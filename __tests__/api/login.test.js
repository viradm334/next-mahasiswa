import { POST } from "../../src/app/api/login/route";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

jest.mock("../../lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock('../../lib/jwt', () => ({
    createJWT: jest.fn().mockResolvedValue('mock-token'),
  }));
  

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

const mockSet = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: mockSet,
  })),
}));

describe("POST /api/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log in a user and return a token", async () => {
    const mockUser = {
      id: 1,
      name: "John",
      email: "john@example.com",
      role: "MAHASISWA",
      password: "hashedpassword",
    };

    prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const req = {
      json: async () => ({
        email: "john@example.com",
        password: "plainpassword",
      }),
    };

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe("Login berhasil!");
    expect(mockSet).toHaveBeenCalledWith(
      "token",
      "mock-token",
      expect.any(Object)
    );
  });

  it("should return 401 if user is not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = {
      json: async () => ({
        email: "notfound@example.com",
        password: "any",
      }),
    };

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.message).toBe("Email atau password salah!");
  });

  it("should return 401 if password does not match", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      name: "John",
      email: "john@example.com",
      password: "hashed",
      role: "MAHASISWA",
    });

    bcrypt.compare.mockResolvedValue(false);

    const req = {
      json: async () => ({
        email: "john@example.com",
        password: "wrongpassword",
      }),
    };

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.message).toBe("Email atau password salah!");
  });
});

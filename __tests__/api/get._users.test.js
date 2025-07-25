import { GET } from "../../src/app/api/get-users/route";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

jest.mock("../../lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

describe("api/get-users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all mahasiswa users", async () => {
    const mockedUsers = [
      {
        id: 1,
        name: "Budi",
        email: "budi@example.com",
        password: "123456",
        role: "MAHASISWA",
      },
      {
        id: 2,
        name: "Adi",
        email: "adi@example.com",
        password: "123456",
        role: "MAHASISWA",
      },
    ];
    prisma.user.findMany.mockResolvedValue(mockedUsers);
    const req = {};
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe("Berhasil mengambil data mahasiswa!");
    expect(json.data).toEqual(mockedUsers);
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: { role: "MAHASISWA" },
    });
  });

  it('should return 500 if prisma fails', async () => {
    prisma.user.findMany.mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.message).toBe('Database error');
  });
});

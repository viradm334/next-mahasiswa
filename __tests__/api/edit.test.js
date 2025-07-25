import { PUT } from "../../src/app/api/edit-user/[id]/route";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      update: jest.fn(),
    },
  },
}));

describe("/api/edit-user[id] PUT", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should edit user data and return success message", async () => {
    const updatedUser = {
        id: 1,
        name: 'Rina Edit',
        email: 'rinaedit@example.com',
        jurusan: 'S1 Informatika'
    }

    prisma.user.update.mockResolvedValue(updatedUser);

    const req = {
      json: async () => ({
        name: 'Rina Edit',
        email: 'rinaedit@example.com',
        jurusan: 'S1 Informatika'
      }),
    };
    const params = { id: "1" };

    const res = await PUT(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe("Berhasil mengubah data user!");
    expect(json.data).toEqual(updatedUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: 'Rina Edit',
        email: 'rinaedit@example.com',
        jurusan: 'S1 Informatika'
      },
    });
  });

  it("should return 500 error if prisma.user.update throws", async () => {
    prisma.user.update.mockRejectedValue(new Error("Database error"));
  
    const req = {
      json: async () => ({
        name: "Error User",
        email: "error@example.com",
        jurusan: 'S1 Farmasi'
      }),
    };
    const params = { id: "999" };
  
    const res = await PUT(req, { params });
    const json = await res.json();
  
    expect(res.status).toBe(500);
    expect(json.message).toBe("Database error");
  });
});

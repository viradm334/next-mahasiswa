import { DELETE } from "../../src/app/api/delete-user/[id]/route";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      delete: jest.fn(),
    },
  },
}));

describe("api/delete/[id] DELETE", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete user and return success message", async () => {
    prisma.user.delete.mockResolvedValue({ id: 123 });
    const req = {};
    const params = { id: "123" };

    const res = await DELETE(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe("Mahasiswa berhasil dihapus!");
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 123 } });
  });

  it("should return 500 on error", async () => {
    prisma.user.delete.mockRejectedValue(new Error("Failed to delete"));

    const req = {};
    const params = { id: "999" };

    const res = await DELETE(req, { params });
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.message).toBe("Failed to delete");
  });
});

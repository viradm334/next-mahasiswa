import { POST } from '../../src/app/api/create-user/route';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';

jest.mock('bcrypt');
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
      user: {
        create: jest.fn(),
      },
    },
  }));

describe('/api/create POST', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return success message', async () => {
    const mockUser = { id: 1, name: 'John', email: 'john@example.com', role: 'MAHASISWA' };

    const mockHashed = 'hashedPassword';
    bcrypt.hash.mockResolvedValue(mockHashed);
    prisma.user.create.mockResolvedValue(mockUser);

    const req = {
      json: async () => ({
        name: 'John',
        email: 'john@example.com',
        password: '123456',
        role: 'MAHASISWA',
      }),
    };

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe('Berhasil membuat akun!');
    expect(json.data).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John',
        email: 'john@example.com',
        password: mockHashed,
        role: 'MAHASISWA',
      },
    });
  });

  it('should return 500 on error', async () => {
    prisma.user.create.mockRejectedValue(new Error('Database error'));

    const req = {
      json: async () => ({
        name: 'Jane',
        email: 'jane@example.com',
        password: '654321',
        role: 'MAHASISWA',
      }),
    };

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.message).toBe('Database error');
  });
});

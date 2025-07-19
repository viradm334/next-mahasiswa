"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";


export default function Mahasiswa() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  async function handleDelete(id) {
    const confirmed = confirm("Anda yakin menghapus mahasiswa?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/delete-user/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Berhasil delete mahasiswa!");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        const data = await res.json();
        console.error("Gagal hapus mahasiswa", data.message);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      });
  }, []);

  useEffect(() => {
    fetch("/api/get-users")
      .then((response) => response.json())
      .then((mhs) => {
        setMessage(mhs.message);
        setUsers(mhs.data);
      })
      .catch((err) => console.error("Failed to fetch data", err));
  }, []);

  return (
    <div>
      {user && <Navbar role={user.role} />}

      <h4 className="text-center text-2xl font-bold mt-5">Daftar Mahasiswa</h4>

      <div className="container p-10 flex flex-col justify-center items-center">
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">No.</th>
              <th className="border border-gray-300 p-2">Nama</th>
              <th className="border border-gray-300 p-2">NIM</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Jurusan</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.nim}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.jurusan}</td>
                  <td className="border border-gray-300 p-2">
                    <Link href={`/edit/${user.id}`}>
                    <button
                      type="button"
                      className="py-1.5 px-3 mr-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md cursor-pointer"
                    >
                      Edit
                    </button>
                    </Link>
                    <button
                      type="button"
                      className="py-1.5 px-3 bg-red-500 hover:bg-red-700 text-white rounded-md cursor-pointer"
                      value={user.id}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

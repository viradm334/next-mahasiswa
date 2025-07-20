"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function BiodataEdit() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nim: "",
    jurusan: "",
  });

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch(`/api/get-user/${user.id}`)
      .then((res) => res.json())
      .then((usr) => {
        setFormData({
          name: usr.data.name,
          email: usr.data.email,
          nim: usr.data.nim,
          jurusan: usr.data.jurusan,
        });
      });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/edit-user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Berhasil ubah data profil!");
        setFormData({
          name: "",
          nim: "",
          email: "",
          jurusan: "",
        });
        router.push("/biodata");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert("Terjadi kesalahan. Coba lagi nanti");
      console.error(err);
    }
  };

  return (
    <div>
      {user && <Navbar role={user.role} />}
      <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">
          Edit Profil
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Nama
            </label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Masukkan nama"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              NIM
            </label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="NIM"
              name="nim"
              value={formData.nim || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Email
            </label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="example@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Jurusan
            </label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Masukkan jurusan"
              name="jurusan"
              value={formData.jurusan || ""}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

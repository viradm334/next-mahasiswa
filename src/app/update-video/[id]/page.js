"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/navbar";

export default function Register() {
const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    link: "",
  });

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setFormData(prev => ({ ...prev, userId: data.user.id }));
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`/api/get-video/${id}`)
        .then((response) => response.json())
        .then((vid) => {
          setFormData({
            title: vid.data.title,
            link: vid.data.link
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/edit-video/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setFormData({
          title: "",
          link: "",
        });
        router.push("/dashboard");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  return (
    <div>
      {user && (
        <>
          <Navbar role={user.role} />
          <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-center mb-4">Edit Video</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="hidden" value={user.id} name="userId" />
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Judul
                </label>
                <input
                  className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Masukkan judul"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Link
                </label>
                <input
                  className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Masukkan link youtube video"
                  name="link"
                  value={formData.link}
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
        </>
      )}
    </div>
  );
}

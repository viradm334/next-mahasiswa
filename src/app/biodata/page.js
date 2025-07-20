"use client";

import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Biodata() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
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
        setUserData({
          name: usr.data.name,
          email: usr.data.email,
          nim: usr.data.nim,
          jurusan: usr.data.jurusan,
        });
      });
  }, [user]);

  return (
    <div>
      {user && (
        <>
          <Navbar role={user.role} />
          <h1 className="font-bold text-slate-600 text-3xl text-center mt-5 mb-3">
            Profil
          </h1>

          <div className="flex flex-col p-10 border-2 rounded-md border-gray-400 w-1/2 mx-auto">
            <h5 className="font-bold text-slate-500 text-2xl mb-2">Nama</h5>
            <p className="font-medium text-slate-800 mb-3">{userData.name}</p>

            <h5 className="font-bold text-slate-500 text-2xl mb-2">Email</h5>
            <p className="font-medium text-slate-800 mb-3">{userData.email}</p>

            <h5 className="font-bold text-slate-500 text-2xl mb-2">NIM</h5>
            <p className="font-medium text-slate-800 mb-3">{userData.nim}</p>

            <h5 className="font-bold text-slate-500 text-2xl mb-2">Jurusan</h5>
            <p className="font-medium text-slate-800 mb-3">
              {userData.jurusan}
            </p>

            <Link href={`/biodata/edit`}>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className="py-1.5 px-3 mr-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md cursor-pointer"
              >
                Edit Profile
              </button>
            </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

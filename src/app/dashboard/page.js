"use client";

import Navbar from "../components/navbar";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  return (
    <div>
      {user && (
        <>
          <Navbar role={user.role} />
          <h1 className="font-bold text-slate-600 text-2xl text-center mt-5">
            Selamat datang, {user.name}
          </h1>
        </>
      )}
    </div>
  );
}

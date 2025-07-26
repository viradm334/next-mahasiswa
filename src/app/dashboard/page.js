"use client";

import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { HandThumbUpIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  useEffect(() => {
    fetch("/api/get-videos")
      .then((res) => res.json())
      .then((vids) => {
        setVideos(vids.data);
      });
  }, []);

  async function handleDelete(id) {
    const confirmed = confirm("Anda yakin menghapus video?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/delete-video/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Berhasil delete video!");
        setVideos(videos.filter((video) => video.id !== id));
      } else {
        const data = await res.json();
        console.error("Gagal hapus video", data.message);
      }
    } catch (err) {
      console.error("Error deleting video:", err);
    }
  }
  
  return (
    <div>
      {user && (
        <>
          <Navbar role={user.role} />
          <h1 className="font-bold text-slate-600 text-2xl text-center mt-5">
            Selamat datang, {user.name}
          </h1>
          {videos.map((video, index) => (
            <div key={index} className="max-w-sm mx-auto mt-8 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-base font-semibold mb-2">{video.title}</h3>
            <h3 className="text-base font-medium mb-3">Owner: {video.user.name}</h3>
            <iframe
              src={`https://www.youtube.com/embed/${video.link}`}
              className="w-full h-48 rounded-md mb-5"
              allowFullScreen
            ></iframe>
            
            {video.userId === user.id && (
              <div className="flex items-center gap-2 text-gray-700">
                <button className="cursor-pointer" onClick={() => {handleDelete(video.id)}}>
                <TrashIcon className="w-5 h-5 text-red-700" />
                </button>
                <Link href={`/update-video/${video.id}`}>
                  <PencilIcon className="w-5 h-5 text-green-700" />
                </Link>
              </div>
            )}
          </div>
          ))};

        </>
      )}
    </div>
  );
}

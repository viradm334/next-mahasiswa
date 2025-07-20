"use client";

import {
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({role}) {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        router.push("/login");
      } else {
        alert("Error logout: ", data.message);
      }
    } catch (err) {
      console.error("Error logout:", err);
    }
  }

  return (
    <nav className="w-full px-4 py-2 bg-gray-700 shadow-md lg:px-8 lg:py-3">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-white">
        <a
          href="/dashboard"
          className="mr-4 block cursor-pointer py-1.5 text-base text-white font-semibold"
        >
          StudentHub
        </a>

        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {role === 'DOSEN' && ( <li className="flex items-center p-1 text-sm gap-x-2 text-white">
              <ClipboardDocumentListIcon className="size-6 text-white" />
              <Link href='/mahasiswa' className="flex items-center">Mahasiswa</Link>
            </li>)}
            {role === 'MAHASISWA' && (<li className="flex items-center p-1 text-sm gap-x-2 text-white">
              <UserCircleIcon className="size-6 text-white" />
              <Link href='/biodata' className="flex items-center">Biodata</Link>
            </li>)}
            <li className="flex items-center p-1 text-sm gap-x-2 text-white">
              <ArrowRightStartOnRectangleIcon className="size-6 text-white" />
              <button
                type="button"
                className="flex items-center cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <button
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}

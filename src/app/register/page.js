'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'MAHASISWA'
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if(res.ok){
                alert(data.message);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: ''
                });
                router.push('/login');
            }else{
                alert(`Error: ${data.message}`);
            }
        }catch(err){
            alert(err);
            console.error(err);
        }
    }

    return(
        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Nama</label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Masukkan nama"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Email</label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Masukkan email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Password</label>
            <input
              className="w-full border border-blue-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Masukkan password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Role</label>
            <div className="w-full max-w-sm min-w-[200px]">      
              <div className="relative">
                <select
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required>
                    <option value="MAHASISWA">MAHASISWA</option>
                    <option value="DOSEN">DOSEN</option>
                </select>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-gray-600">
            Sudah punya akun?
            <Link href="/login" className="text-blue-600 ml-1.5 underline">
      Login
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
      )
}
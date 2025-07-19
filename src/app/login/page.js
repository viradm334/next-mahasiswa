'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if(res.ok){
                alert(`${data.message}`);
                setFormData({
                    email: '',
                    password: ''
                });
                router.push('/dashboard');
            }else{
                alert(`Error: ${data.message}`);
            }
        }catch(err){
            alert(err);
            console.error(err);
        }
    }

    const loginGoogle = async () => {
      try{
        const res = await fetch('/api/login-google', {
          method: 'POST'
        });

        const data = await res.json();

        if(res.ok){
          alert(data.message);
          router.push('/dashboard')
        }else{
          alert('Error: ', data.message);
        }
      }catch(err){
        alert(err);
        console.error(err);
      }
    }

    return(
        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Email</label>
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
          <div className="text-gray-600">
            Belum punya akun?
            <Link href="/register" className="text-blue-600 ml-1.5 underline">
      Register
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer mb-5"
          >
            Login
          </button>
        </form>
        <button type="button" className="flex items-center justify-center gap-2 w-full bg-transparent border-gray-400 hover:bg-gray-400 hover:text-white hover:outline-none border-1 rounded-md py-2 px-4 cursor-pointer text-slate-500 font-semibold" onClick={() => {loginGoogle()}}>
            <img src="google.svg" alt="Google" className="w-5 h-5"></img>
            Login dengan Google</button>
      </div>
      )
}
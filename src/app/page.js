import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <h1 className="font-bold text-gray-800 text-3xl mb-4">Selamat datang!</h1>
      <p className="font-medium text-gray-700 mb-5">
        Untuk menggunakan aplikasi ini, silahkan login terlebih dahulu
      </p>

      <Link href="/login">
        <button
          type="button"
          className="py-1.5 px-3 mr-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md cursor-pointer"
        >
          Login
        </button>
      </Link>
    </div>
  );
}

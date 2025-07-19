export default function Unauthorized(){
    return(
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
            <h1 className="font-bold text-6xl text-slate-500 mb-2">401</h1>
            <h1 className="font-semibold text-2xl text-slate-400">Unauthorized</h1>
        </div>
    )
}
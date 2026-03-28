"use client";

import { useState } from "react";

export default function ProfilePage() {
  // Simulación de datos de usuario
  const [user, setUser] = useState({
    username: "Agent007",
    email: "agent@abyss.ai",
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ ...form });
    setSuccess(true);
    setEditing(false);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#02080a] text-cyan-50 font-mono flex flex-col items-center justify-start px-6 pt-20">
      <h1 className="text-6xl font-black tracking-widest text-cyan-400 mb-8 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
        PERFIL
      </h1>

      <div className="w-full max-w-md bg-[#01111a] border border-cyan-800 rounded p-6 flex flex-col gap-6">
        {editing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="px-4 py-3 bg-[#02080a] border border-cyan-800 rounded text-xs placeholder-cyan-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-3 bg-[#02080a] border border-cyan-800 rounded text-xs placeholder-cyan-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <div className="flex gap-4 mt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-3 border border-cyan-400 text-cyan-400 text-xs uppercase tracking-[0.3em] hover:bg-cyan-400 hover:text-black transition-all"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 px-4 py-3 border border-cyan-900 text-cyan-900 text-xs uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors"
              >
                Cancel·lar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-cyan-600 uppercase tracking-[0.3em] text-[8px]">
                Nom d&apos;usuari
              </span>
              <div className="text-cyan-50 font-bold text-sm">
                {user.username}
              </div>
            </div>
            <div>
              <span className="text-cyan-600 uppercase tracking-[0.3em] text-[8px]">
                Correu electrònic
              </span>
              <div className="text-cyan-50 font-bold text-sm">{user.email}</div>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-6 py-3 border border-cyan-400 text-cyan-400 text-xs uppercase tracking-[0.3em] hover:bg-cyan-400 hover:text-black transition-all"
            >
              Editar Perfil
            </button>
          </div>
        )}

        {success && (
          <div className="text-green-400 text-[10px] mt-2">
            Perfil actualitzat!
          </div>
        )}

        <div className="mt-6 text-[10px] text-cyan-900 tracking-widest">
          Vols canviar la contrasenya?{" "}
          <a href="/register" className="text-cyan-400 hover:underline">
            Canvia-la aquí
          </a>
        </div>
      </div>
    </main>
  );
}

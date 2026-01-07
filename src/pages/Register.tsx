import { useState } from "react";
import { authService } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await authService.register(form);
      setMsg("Registro exitoso. Revisa tu correo si se requiere verificación.");
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Error al registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h2 className="font-serif text-2xl text-lineageGold mb-6">Crear cuenta</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300">Usuario</label>
          <input
            className="mt-1 w-full bg-lineageGray border border-gray-700 rounded-md"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300">Email</label>
          <input
            type="email"
            className="mt-1 w-full bg-lineageGray border border-gray-700 rounded-md"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300">Contraseña</label>
          <input
            type="password"
            className="mt-1 w-full bg-lineageGray border border-gray-700 rounded-md"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            minLength={6}
            required
          />
        </div>
        <button disabled={loading} className="w-full py-2 bg-lineageGold text-black rounded-md">
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-gray-200">{msg}</p>}
    </div>
  );
}

import { useState } from "react";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const data = await authService.login(form);
      setUser(data.user);
      setToken(data.token);
      setMsg("Inicio de sesión exitoso.");
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Credenciales inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h2 className="font-serif text-2xl text-lineageGold mb-6">Iniciar sesión</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300">Usuario o Email</label>
          <input
            className="mt-1 w-full bg-lineageGray border border-gray-700 rounded-md"
            value={form.usernameOrEmail}
            onChange={e => setForm({ ...form, usernameOrEmail: e.target.value })}
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
            required
          />
        </div>
        <button disabled={loading} className="w-full py-2 bg-lineageGold text-black rounded-md">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-gray-200">{msg}</p>}
    </div>
  );
}

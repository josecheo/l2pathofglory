import { useCallback, useState } from "react";
import { ApiError, webRegister } from "../services/webRegisterApi";

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type FieldErrors = Partial<Record<keyof RegisterForm, string>>;

function validateClient(form: RegisterForm): FieldErrors {
  const errors: FieldErrors = {};

  const email = form.email.trim().toLowerCase();
  const username = form.username.trim();

  if (!email) errors.email = "Ingresa un correo";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Correo inválido";

  if (!username) errors.username = "Ingresa un usuario";
  else if (!/^[a-zA-Z0-9_]{4,16}$/.test(username))
    errors.username = "4-16 chars, letras/números/_";

  if (!form.password) errors.password = "Ingresa una contraseña";
  else if (form.password.length < 8) errors.password = "Mínimo 8 caracteres";

  if (!form.confirmPassword) errors.confirmPassword = "Confirma la contraseña";
  else if (form.confirmPassword !== form.password)
    errors.confirmPassword = "No coincide";

  return errors;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (form: RegisterForm) => {
    setSuccess(false);
    setError(null);

    const clientErrors = validateClient(form);
    setFieldErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return false;

    setLoading(true);
    try {
      await webRegister({
        email: form.email.trim().toLowerCase(),
        username: form.username.trim(),
        password: form.password,
      });

      setSuccess(true);
      return true;
    } catch (e: any) {
      const apiErr = e as ApiError;

      // Mapeo específico de tus errores del BFF
      if (apiErr.status === 409) {
        if (apiErr.message.includes("Email")) {
          setFieldErrors((prev) => ({ ...prev, email: "Este correo ya está registrado" }));
          setError(null);
          return false;
        }
        if (apiErr.message.includes("Username")) {
          setFieldErrors((prev) => ({ ...prev, username: "Este usuario ya existe" }));
          setError(null);
          return false;
        }
      }

      if (apiErr.status === 400) {
        setError("Revisa los campos e intenta nuevamente.");
        return false;
      }

      setError(apiErr.message || "Error inesperado");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error, fieldErrors, success };
}

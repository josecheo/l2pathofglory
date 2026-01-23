import { useEffect, useState } from "react";
import { tokenStorage } from "../auth/tokenStorage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!tokenStorage.get()
  );

  useEffect(() => {
    const onStorage = () => {
      setIsAuthenticated(!!tokenStorage.get());
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    isAuthenticated,
  };
}

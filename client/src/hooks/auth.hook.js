import { useState, useCallback, useEffect } from "react";

const storageName = "userStorage";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const login = useCallback((jwtToken, id, email) => {
    setToken(jwtToken);
    setUserId(id);
    setEmail(email);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, email: email, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setEmail(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token && data.email) {
      login(data.token, data.userId, data.email);
    }
  }, [login]);
  return { token, userId, email, login, logout };
};

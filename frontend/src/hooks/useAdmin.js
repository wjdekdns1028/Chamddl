import { useState } from 'react';

let _token = null;

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => !!_token);

  const loginAdmin = (token) => {
    _token = token;
    setIsAdmin(true);
  };

  const logoutAdmin = () => {
    _token = null;
    setIsAdmin(false);
  };

  return { isAdmin, loginAdmin, logoutAdmin };
}

import { AuthContext } from "app/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
 return useContext(AuthContext)
}


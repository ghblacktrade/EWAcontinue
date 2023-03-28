import { useAuth } from "app/hooks/useAuth"

 export const useCheckAuth = (routeName?: string) => {
  const { user, setUser } = useAuth()
 }
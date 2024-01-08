import { useSelector } from "react-redux";

export function useAuth() {
    // Retrive auth state from redux store
    const isAuth = useSelector((state) => state.isAuthenticated);

    // Return auth state (if user is authenticated or not)
    return isAuth;
}
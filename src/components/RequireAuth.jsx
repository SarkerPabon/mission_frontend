import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Spinner from "./Spinner";

const RequireAuth = ({ children }) => {
	const { token, loading } = useAuth();
	// console.log("RequireAuth Token: ", token);

	const location = useLocation();

	if (loading) {
		return <Spinner />;
	}

	if (!token) {
		return <Navigate to={"/login"} state={{ path: location.pathname }} />;
	}

	return children;
};

export default RequireAuth;

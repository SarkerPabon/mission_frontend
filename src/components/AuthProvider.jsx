import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("Called AuthContext");
		setToken(JSON.parse(localStorage.getItem("token")));
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={{ token, setToken, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

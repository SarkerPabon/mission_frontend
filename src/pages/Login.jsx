import { useState } from "react";
import AuthForm from "../components/AuthForm";
import axiosInstance from "../config/axiosService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setToken } = useAuth();

	const handleLogin = async (submittedData) => {
		console.log("Login form data:", submittedData);

		const { email, password } = submittedData;

		if (!email || !password) {
			setError("Please fill up all credentials");
			return;
		}
		try {
			setLoading(true);
			setError("");
			// Send form data to the server
			const response = await axiosInstance.post(
				"/api/users/login",
				submittedData
			);
			console.log("Login Response:", response.data);
			localStorage.setItem("token", JSON.stringify(response.data));
			setLoading(false);
			setToken(response.data);
			navigate("/");
			toast.success("Login Successfully !");
		} catch (error) {
			setLoading(false);
			setError(error.response.data.message);
			console.error("Error:", error);
			toast.error(error);
			// navigate("/login");
		}
	};

	return (
		<main>
			<AuthForm
				type='login'
				onSubmit={handleLogin}
				error={error}
				loading={loading}
			/>
		</main>
	);
};

export default Login;

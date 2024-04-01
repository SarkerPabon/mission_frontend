import { useState } from "react";
import AuthForm from "../components/AuthForm";
import axiosInstance from "../config/axiosService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const Signup = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setToken } = useAuth();

	const handleSignUp = async (submittedData) => {
		console.log("Signup form data:", submittedData);

		const { name, email, password } = submittedData;

		if (!name || !email || !password) {
			setError("Please fill up all credentials");
			return;
		}
		try {
			setLoading(true);
			setError("");
			// Send form data to the server
			const response = await axiosInstance.post("/api/users", submittedData);
			// console.log("Signup Response:", response.data);
			localStorage.setItem("token", JSON.stringify(response.data));
			setToken(response.data);
			setLoading(false);
			navigate("/");
		} catch (error) {
			setLoading(false);
			setError(error.response?.data.message);
			console.error("Error:", error);
			// navigate("/signup");
		}
	};

	return (
		<main>
			{/* <h1>Signup</h1> */}
			<AuthForm
				type='signup'
				onSubmit={handleSignUp}
				error={error}
				loading={loading}
			/>
		</main>
	);
};

export default Signup;

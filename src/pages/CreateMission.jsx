import { useState } from "react";
import MissionForm from "../components/MissionForm";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import axiosInstance from "../config/axiosService";
import { toast } from "react-toastify";

const CreateMission = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { token } = useAuth();
	console.log("Create Mission Token: ", token);

	const navigate = useNavigate();
	const handleCreateMission = async (createData) => {
		console.log("Create Data: ", createData);

		const { title, description, status } = createData;

		if (!title || !description || status === undefined) {
			setError("Please fill up all fields");
			return;
		}

		try {
			setLoading(true);
			setError("");
			// Send form data to the server
			const response = await axiosInstance.post(`/api/missions`, createData, {
				headers: {
					Authorization: `Bearer ${token.token}`,
				},
			});
			// console.log("Create Response:", response.data);
			setLoading(false);
			navigate("/");
			toast.success("Create Mission Successfully !");
		} catch (error) {
			setLoading(false);
			setError(error.response.data.message);
			console.error("Error:", error);
			// navigate("/login");
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className='dashboard_container'>
			<h1>Create Mission</h1>
			<MissionForm type='add' onSubmit={handleCreateMission} error={error} />
		</div>
	);
};

export default CreateMission;

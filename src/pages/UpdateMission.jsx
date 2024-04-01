import { useEffect, useState } from "react";
import MissionForm from "../components/MissionForm";
import axiosInstance from "../config/axiosService";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { toast } from "react-toastify";

const UpdateMission = () => {
	const [oldTitle, setOldTitle] = useState("");
	const [oldDescription, setOldDescription] = useState("");
	const [oldStatus, setOldStatus] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const { token } = useAuth();
	// console.log("Update Mission Token: ", token);

	const { id } = useParams();
	const navigate = useNavigate();
	console.log("Update Params: ", id);

	const handleUpdateMission = async (updatedData) => {
		console.log("Updated Data: ", updatedData);

		const { title, description, status } = updatedData;

		if (!title || !description || status === undefined) {
			setError("Please fill up all fields");
			return;
		}

		try {
			setLoading(true);
			setError("");
			// Send form data to the server
			const response = await axiosInstance.put(
				`/api/missions/${id}`,
				updatedData,
				{
					headers: {
						Authorization: `Bearer ${token.token}`,
					},
				}
			);
			console.log("Update Response:", response.data);
			setLoading(false);
			navigate("/");
			toast.success("Update Successfully !");
		} catch (error) {
			setLoading(false);
			setError(error.response.data.message);
			console.error("Error:", error);
			// navigate("/login");
		}
	};

	useEffect(() => {
		axiosInstance
			.get(`/api/missions/${id}`)
			.then((response) => {
				console.log("Update Mission: ", response.data);
				const { title, description, status } = response.data;
				setOldTitle(title);
				setOldDescription(description);
				setOldStatus(status);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className='dashboard_container'>
			<h1>Update Mission</h1>
			<MissionForm
				type='update'
				onSubmit={handleUpdateMission}
				oldTitle={oldTitle}
				oldDescription={oldDescription}
				oldStatus={oldStatus}
				error={error}
				id={id}
			/>
		</div>
	);
};

export default UpdateMission;

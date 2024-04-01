import { useParams } from "react-router-dom";
import SurvayForm from "../components/SurvayForm";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosService";
import Spinner from "../components/Spinner";

const MissionDetails = () => {
	const [loading, setLoading] = useState(true);
	const [mission, setMission] = useState();
	const [error, setError] = useState("");

	const { id } = useParams();

	useEffect(() => {
		axiosInstance
			.get(`api/missions/${id}`)
			.then((response) => {
				setMission(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.response.data.message);
				console.error("Error:", error);
			});
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className='dashboard_container'>
			<h1>{mission.title} Survey</h1>
			<br />
			<SurvayForm />
		</div>
	);
};

export default MissionDetails;

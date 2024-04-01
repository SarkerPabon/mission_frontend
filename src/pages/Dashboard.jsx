import { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosInstance from "../config/axiosService";
import Spinner from "../components/Spinner";

const Dashboard = () => {
	const [missions, setMissions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axiosInstance
			.get("/api/missions")
			.then((response) => {
				console.log(response.data);
				setMissions(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error.response.data.message);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<main className='dashboard_container'>
			<h1>All Active Missions</h1>

			{missions.length > 0 ? (
				<div className='cards'>
					{missions.map((mission) => (
						<Card
							key={mission._id}
							title={mission.title}
							description={mission.description}
							status={mission.status ? "Open" : "Close"}
							id={mission._id}
						/>
					))}
				</div>
			) : (
				<>
					<br />
					<h3>Currently no active missions available right now</h3>
				</>
			)}
		</main>
	);
};

export default Dashboard;

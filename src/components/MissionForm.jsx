import { useEffect, useState } from "react";
// import "./MissionForm.css";
import axiosInstance from "../config/axiosService";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MissionForm = ({
	type,
	onSubmit,
	oldTitle,
	oldDescription,
	oldStatus,
	error,
	id,
}) => {
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteError, setDeleteError] = useState("");
	const { token } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		console.log("Mission Form: ", data);
		console.log("Mission Form useState: ", { title, description, status });
		onSubmit({ title, description, status });
	};

	const handleMissionDelete = async (event) => {
		event.preventDefault();

		if (!id) {
			setDeleteError("Mission ID does not found");
		}

		try {
			setDeleteLoading(true);
			setDeleteError("");
			// Send form data to the server
			const response = await axiosInstance.delete(`/api/missions/${id}`, {
				headers: {
					Authorization: `Bearer ${token.token}`,
				},
			});
			console.log("Delete Response:", response.data);
			setDeleteLoading(false);
			navigate("/");
			toast.success("Mission Delete !");
		} catch (error) {
			setDeleteLoading(false);
			setDeleteError(error.response.data.message);
			console.error("Error:", error);
			// navigate("/login");
		}
	};

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState(true);

	useEffect(() => {
		if (type === "update") {
			setTitle(oldTitle);
			setDescription(oldDescription);
			setStatus(oldStatus);
		}
	}, [type]);

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='description'>Description</label>
					<textarea
						name='description'
						id='description'
						cols='30'
						rows='5'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				<div className='form-group'>
					<label htmlFor='status'>Status</label>
					<select
						name='status'
						id='status'
						value={status}
						onChange={(e) =>
							setStatus(e.target.value === "true" ? true : false)
						}
					>
						<option value={true}>Open</option>
						<option value={false}>Close</option>
					</select>
				</div>
				{type === "update" ? (
					<>
						<div className='btn-group'>
							<div className='form-group'>
								<button type='submit' className='btn '>
									Update Mission
								</button>
							</div>
							<div className='form-group'>
								<button
									type='submit'
									onClick={handleMissionDelete}
									className='btn btn-delete'
								>
									Delete Mission
								</button>
							</div>
						</div>
					</>
				) : (
					<>
						<div className='form-group'>
							<button type='submit' className='btn btn-block'>
								Create Mission
							</button>
						</div>
					</>
				)}

				{error && <p className='error'>{error}</p>}
			</form>
		</section>
	);
};

export default MissionForm;

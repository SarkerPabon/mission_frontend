import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import axiosInstance from "../config/axiosService";
import { toast } from "react-toastify";

const SurvayForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [profession, setProfession] = useState("");
	const [rate, setRate] = useState("");
	const [review, setReview] = useState("");
	const [survayError, setSurvayError] = useState("");
	const [survayLoading, setSurvayLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		console.log("Survay Form: ", data);

		const { name, email, profession, rate, review } = data;

		if (!name || !email || !profession || !rate || !review) {
			setSurvayError("Please fill up all servey fields");
			return;
		}

		if (!id) {
			setError("This mission does not exist");
			return;
		}

		const servayData = {
			name,
			email,
			profession,
			rate,
			review,
			mission: id,
		};

		try {
			setSurvayLoading(true);
			setSurvayError("");
			// Send form data to the server
			const response = await axiosInstance.post(`/api/survays`, servayData);
			console.log("Servay Response:", response.data);
			setSurvayLoading(false);
			navigate("/");
			toast.success("Thank You !");
		} catch (error) {
			setSurvayLoading(false);
			setSurvayError(error.response.data.message);
			console.error("Error:", error);
			// navigate("/login");
		}
	};

	/* if(survayLoading) {
		return <Spinner />
	} */

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='profession'>What are you currently doing?</label>
					<select
						name='profession'
						id='profession'
						value={profession}
						onChange={(e) => setProfession(e.target.value)}
					>
						<option value={"teaching"}>Teacher</option>
						<option value={"student"}>Student</option>
						<option value={"programming"}>Programmer</option>
						<option value={"other"}>Other</option>
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='rate'>Please rate this mission</label>
					<select
						name='rate'
						id='rate'
						value={rate}
						onChange={(e) => setRate(e.target.value)}
					>
						<option value={"excellent"}>Excellent</option>
						<option value={"good"}>Good</option>
						<option value={"poor"}>Poor</option>
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='review'>Write your review</label>
					<textarea
						name='review'
						id='review'
						cols='30'
						rows='5'
						value={review}
						onChange={(e) => setReview(e.target.value)}
					></textarea>
				</div>

				<div className='form-group'>
					<button type='submit' className='btn btn-block'>
						Submit Survay
					</button>
				</div>

				{survayError && <p className='error'>{survayError}</p>}
			</form>
		</section>
	);
};

export default SurvayForm;

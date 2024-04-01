// AuthForm.js (Reusable component for signup and login forms)

import React from "react";
import Spinner from "./Spinner";

const AuthForm = ({ type, onSubmit, error, loading }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		onSubmit(data);
	};

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<h1>{type === "signup" ? "Sign Up" : "Login"}</h1>
				{type === "signup" && (
					<div className='form-group'>
						<label htmlFor='name'>Name</label>
						<input type='text' id='name' name='name' required />
					</div>
				)}
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' name='email' required />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' name='password' required />
				</div>
				<button className='btn btn-block' type='submit'>
					{type === "signup" ? "Sign Up" : "Login"}
				</button>
				{error && <p className='error'>{error}</p>}
				{loading && <Spinner />}
			</form>
		</section>
	);
};

export default AuthForm;

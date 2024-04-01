// Card.js

import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// import React from "react";
// import "./Card.css";

const Card = ({ title, description, status, id }) => {
	const { token } = useAuth();

	return (
		<div className='card'>
			<div className='card-header'>
				<h2>{title}</h2>
				<p>Status: {status}</p>
			</div>
			<div className='card-body'>
				<p>{description.slice(0, 150) + "...."}</p>
			</div>
			<div className='card-footer' style={{ display: !status ? "none" : "" }}>
				<Link to={`/survay/${id}`} className='btn'>
					Participate
				</Link>
				{token?.email && (
					<Link to={`/update/${id}`} className='btn'>
						Update
					</Link>
				)}
			</div>
		</div>
	);
};

export default Card;

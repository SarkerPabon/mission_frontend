// Card.js

import { Link } from "react-router-dom";

// import React from "react";
// import "./Card.css";

const Card = ({ title, description, status, id }) => {
	return (
		<div className='card'>
			<div className='card-header'>
				<h2>{title}</h2>
				<p>Status: {status}</p>
			</div>
			<div className='card-body'>
				<p>{description}</p>
			</div>
			<div className='card-footer' style={{ display: !status ? "none" : "" }}>
				<Link to={`/${id}`} className='btn'>
					View
				</Link>
				<Link to={`/update/${id}`} className='btn'>
					Update
				</Link>
			</div>
		</div>
	);
};

export default Card;

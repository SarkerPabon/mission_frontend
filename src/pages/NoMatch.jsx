import { Link } from "react-router-dom";

const NoMatch = () => {
	return (
		<div className='not-found-container dashboard_container'>
			<h1 className='not-found-title'>404 - Not Found</h1>
			<p className='not-found-text'>
				Sorry, the page you are looking for does not exist.
			</p>
			<Link to='/' className='btn'>
				Go to Home
			</Link>
		</div>
	);
};

export default NoMatch;

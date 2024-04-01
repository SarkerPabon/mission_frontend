import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
	const [showNavbar, setShowNavbar] = useState(true);
	const navigate = useNavigate();
	const { setToken, token } = useAuth();

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem("token");
		setShowNavbar(true);
		toast("Logout Successfully !");
		navigate("/");
	};

	return (
		<>
			<header className='navbar'>
				<div className='nav_container'>
					<NavLink to='/' className='logo'>
						SI Servey
					</NavLink>
					<div className='menu-icon' onClick={handleShowNavbar}>
						&#9776;
						{/* <FaAlignJustify /> */}
					</div>
				</div>
				<nav className={`menu ${showNavbar ? "close" : ""}`}>
					<ul>
						<li>
							<NavLink to='/' onClick={() => setShowNavbar(true)}>
								Dashboad
							</NavLink>
						</li>
						{token ? (
							<>
								<li>
									<NavLink to='/create' onClick={() => setShowNavbar(true)}>
										Create
									</NavLink>
								</li>
								<li>
									<NavLink to='/archive' onClick={() => setShowNavbar(true)}>
										Archived
									</NavLink>
								</li>
								<li>
									<div className='user'>{token.name}</div>
								</li>
								<li>
									<button className='btn' onClick={handleLogout}>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<NavLink to='/signup' onClick={() => setShowNavbar(true)}>
										SignUp
									</NavLink>
								</li>
								<li>
									<NavLink to='/login' onClick={() => setShowNavbar(true)}>
										Login
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Navbar;

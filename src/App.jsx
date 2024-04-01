import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

// Pages
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthProvider from "./components/AuthProvider";
import CreateMission from "./pages/CreateMission";
import UpdateMission from "./pages/UpdateMission";
import MissionDetails from "./pages/MissoinDetails";
import NoMatch from "./pages/NoMatch";
import Archive from "./pages/Archive";

function App() {
	return (
		<AuthProvider>
			<div className='container'>
				<BrowserRouter>
					<Navbar />

					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/:id' element={<MissionDetails />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='/create'
							element={
								<RequireAuth>
									<CreateMission />
								</RequireAuth>
							}
						/>
						<Route
							path='/archive'
							element={
								<RequireAuth>
									<Archive />
								</RequireAuth>
							}
						/>
						<Route
							path='/update/:id'
							element={
								<RequireAuth>
									<UpdateMission />
								</RequireAuth>
							}
						/>
						<Route path='*' element={<NoMatch />} />
					</Routes>
				</BrowserRouter>
				<ToastContainer />
			</div>
		</AuthProvider>
	);
}

export default App;

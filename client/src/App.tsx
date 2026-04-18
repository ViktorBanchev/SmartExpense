import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login";
import { useAuthStore } from "./store/authStore";
import Register from "./pages/Register";

function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	return (
		<>
			<Routes>
				<Route path="/" element={isAuthenticated ? <Home /> : <Navigate to={'/login'} />} />
				<Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={'/'} />} />
				<Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={'/'} />} />
			</Routes>
		</>
	)
}

export default App;

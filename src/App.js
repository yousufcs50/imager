import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/loginform";
import Dashboard from "./components/Dashboard";
import CreateUser from "./components/createuser";
import ChangePassword from "./components/change_password";
import Preds from "./components/Preds";
import ProtectedRoute from "./protected_routes";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginForm />} />
				<Route path="/" element={<LoginForm />} />
				<Route
					path="/createuser"
					element={<ProtectedRoute component={CreateUser} />}
				/>
				<Route
					path="/dashboard"
					element={<ProtectedRoute component={Dashboard} />}
				/>
				<Route
					path="/pass"
					element={<ProtectedRoute component={ChangePassword} />}
				/>
				<Route
					path="/preds/:folderName"
					element={<ProtectedRoute component={Preds} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;

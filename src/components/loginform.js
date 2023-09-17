import React, { useState } from "react";
import axios from "axios";
import "./loginform.css";
import { useNavigate } from "react-router-dom";
import { host, login_controller } from "../constants";
import MyModal from "./Modal/modal";

const LoginForm = () => {
	const [popupStyle, showPopup] = useState("hide");
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isModalVisible, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const handleSubmit = async (e) => {
		if (username === "" || password === "") {
			setModalMessage("Both email and password are required");
			setShowModal(true);
			return;
		}
		e.preventDefault();

		// Prepare data to send
		const data = {
			username: username,
			password: password,
		};

		try {
			// Make the API call
			const api = host + login_controller + "login";
			// console.log(process.env.REACT_APP_API);
			const response = await axios.post(api, JSON.stringify(data), {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.data.message === "Login successful") {
				// You can redirect to the dashboard or do something else
				if (response.data.token) {
					// Store the token in-memory, or in HttpOnly cookies as per your use case
					sessionStorage.setItem("token", response.data.token); // Example using sessionStorage
					navigate("/dashboard");
				}
				// setMessage('Login successful');
			} else {
				setModalMessage("Invalid credentials");
				setShowModal(true);
			}
		} catch (error) {
			setModalMessage("Invalid credentials");
			setShowModal(true);
		}
	};

	const isLoginDisabled = !username || !password;

	return (
		<div className="page">
			<div className="cover">
				<form onSubmit={handleSubmit}>
					<div className="login-text">
						<h2>Login</h2>
					</div>
					<div className="login-form">
						<input
							type="text"
							id="username"
							value={username}
							placeholder="usename"
							onChange={(e) => setUsername(e.target.value)}
							required
						/>

						<input
							type="password"
							id="password"
							value={password}
							placeholder="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<div className={popupStyle}>
							<h3>Login Failed</h3>
							<p>Username or password incorrect</p>
						</div>
						<div>
							<button
								className="login-btn"
								type="submit"
								disabled={isLoginDisabled}
							>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
			<MyModal
				show={isModalVisible}
				handleClose={() => setShowModal(false)}
				title="Error Logging in"
			>
				{modalMessage}
			</MyModal>
		</div>
	);
};

export default LoginForm;

import React, { useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { getUserId } from "../token_check";
import { validatePassword } from "../utils";
import axios from "axios";
import { host, login_controller } from "../constants";
import MyModal from "./Modal/modal";

const CreateUser = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// State to manage modal visibility
	const [isModalVisible, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const token = sessionStorage.getItem("token");

	const handleCreateUser = async () => {
		const isValid = validatePassword(password);
		if (isValid) {
			const name = getUserId(sessionStorage.getItem("token"));
			if (name === "admin") {
				try {
					const api = host + login_controller + "create_user";
					const data = { username, password }; // replace with actual values
					const response = await axios.post(api, data, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					// On success, show a Modal and navigate to the dashboard
					if (response.data.message == "User created successfully") {
						console.log(response.data.message);
						setModalMessage("User created successfully!");
						setShowModal(true);
						// navigate('/dashboard');  // You can navigate after closing the modal
					} else {
						setModalMessage("User creation failed!");
						setShowModal(true);
					}
				} catch (error) {
					console.log(error);
					setModalMessage("An error occurred!");
					setShowModal(true);
				}
			} else {
				setModalMessage("You are not authorized to create a new user.");
				setShowModal(true);
			}
		} else {
			setModalMessage(
				"Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one number."
			);
			setShowModal(true);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleCreateUser();
	};

	const dashboardStyle = {
		display: "flex",
		height: "100vh",
	};

	const contentStyle = {
		width: "100%",
		padding: "20px",
		backgroundColor: "#ebf4f1",
		textAlign: "center",
	};

	const separator = {
		margin: "20px 0",
		border: "0",
		borderTop: "1px solid #b2d85f",
	};

	const separator2 = {
		margin: "20px 0",
		border: "0",
		borderTop: "1px #b2d85f",
	};

	const buttonStyle = {
		padding: "2% 2%",
		display: "flex-filled",
		backgroundColor: "#b2d85f",
		border: "none",
		borderRadius: "0.5em",
		color: "white",
		boxShadow: "0.2% 0 1% rgba(0, 0, 0, 0.1)",
		cursor: "pointer",
		transition: "background-color 0.3s",
	};

	return (
		<div style={dashboardStyle}>
			<Sidebar />
			<div style={contentStyle}>
				<div></div>
				<h1>Create User</h1>
				<hr style={separator} />
				<form onSubmit={handleSubmit}>
					<p>Username:</p>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<p>Password:</p>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<hr style={separator2} />
					<button style={buttonStyle} type="submit">
						Create User
					</button>
				</form>
			</div>
			<MyModal
				show={isModalVisible}
				handleClose={() => setShowModal(false)}
				title="Notification"
			>
				{modalMessage}
			</MyModal>
		</div>
	);
};

export default CreateUser;

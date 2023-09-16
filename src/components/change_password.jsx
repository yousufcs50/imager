import React, { useState } from "react";
import MyModal from "./Modal/modal";
import { host, login_controller } from "../constants";
import { validatePassword } from "../utils";
import axios from "axios";
import Sidebar from "./sidebar/sidebar";

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

const ChangePassword = () => {
	const [Password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const token = sessionStorage.getItem("token");

	const handleChangePassword = async () => {
		if (newPassword !== retypePassword) {
			setModalMessage("Passwords do not match.");
			setShowModal(true);
			return;
		}
		if (newPassword == Password) {
			setModalMessage("New password cannot be same as old password.");
			setShowModal(true);
			return;
		}

		if (!validatePassword(newPassword)) {
			console.log(newPassword);
			setModalMessage(
				"Password must be at least 8 characters long and contain at least one uppercase, one lowercase, and one number."
			);
			setShowModal(true);
			return;
		}

		try {
			const data = { old_password: Password, new_password: newPassword };
			const api = host + login_controller + "change-password";
			const response = await axios.post(api, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const message = "Password successfully changed";
			if (response.data.message == message) {
				setModalMessage("Password changed successfully.");
				setShowModal(true);
			} else {
				setModalMessage("An error occurred while changing the password.");
				setShowModal(true);
			}
		} catch (error) {
			setModalMessage(
				"An error occurred. Please try again " + error.response.data.message
			);
			setShowModal(true);
		}
	};

	return (
		<div style={dashboardStyle}>
			<Sidebar />
			<div style={contentStyle}>
				<h2>Change Password</h2>
				<hr style={separator} />
				<p>Current password:</p>
				<input
					type="password"
					placeholder="Current password"
					value={Password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p>New password:</p>
				<input
					type="password"
					placeholder="New Password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<p>Retype new password:</p>
				<input
					type="password"
					placeholder="Retype New Password"
					value={retypePassword}
					onChange={(e) => setRetypePassword(e.target.value)}
				/>
				<hr style={separator2} />
				<div style={buttonStyle} onClick={handleChangePassword}>
					Change Password
				</div>
			</div>
			<MyModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				title="Notification"
			>
				{modalMessage}
			</MyModal>
		</div>
	);
};

export default ChangePassword;

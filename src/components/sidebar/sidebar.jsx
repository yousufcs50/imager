import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sidebarStyle = {
	// Add your style here
	width: "20%",
	backgroundColor: "#212529",
	color: "#fff",
	padding: "5% 0%",
	display: "flex",
	flexDirection: "column",
	flexShrink: 0,
};

const buttonStyle = (isHovered) => ({
	width: "100%",
	border: "none",
	backgroundColor: isHovered ? "#82c784" : "#212529",
	color: "#fff",
	textAlign: "left",
	padding: "2rem",
});

function Sidebar() {
	const navigate = useNavigate();

	const [dashboardHover, setDashboardHover] = useState(false);
	const [createUserHover, setCreateUserHover] = useState(false);
	const [signOutHover, setSignOutHover] = useState(false);
	const [passwordHover, setpasswordHover] = useState(false);

	const handleSignOut = () => {
		// Your sign-out logic here
		sessionStorage.setItem("token", "");
		navigate("/");
	};

	const goToDashboard = () => {
		navigate("/dashboard");
	};

	const goToCreateUser = () => {
		navigate("/createuser");
	};

	const change_password = () => {
		navigate("/pass");
	};
	return (
		<div style={sidebarStyle}>
			{/* <hr></hr> */}
			<ul
				className="nav nav-pills flex-column mb-auto"
				style={{ listStyle: "none" }}
			>
				<li className="nav-item">
					<button
						style={buttonStyle(dashboardHover)}
						onMouseEnter={() => setDashboardHover(true)}
						onMouseLeave={() => setDashboardHover(false)}
						onClick={goToDashboard}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15%"
							height="15%"
							fill="currentColor"
							className="bi bi-person-plus"
							viewBox="0 0 20 20"
						>
							<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
							<path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
						</svg>
						Dashboard
					</button>
				</li>
				<li>
					<button
						style={buttonStyle(createUserHover)}
						onMouseEnter={() => setCreateUserHover(true)}
						onMouseLeave={() => setCreateUserHover(false)}
						onClick={goToCreateUser}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15%"
							height="15%"
							fill="currentColor"
							className="bi bi-person-plus"
							viewBox="0 0 20 20"
						>
							<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							<path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
						</svg>
						Create User
					</button>
				</li>
				<li>
					<button
						style={buttonStyle(passwordHover)}
						onMouseEnter={() => setpasswordHover(true)}
						onMouseLeave={() => setpasswordHover(false)}
						onClick={change_password}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15%"
							height="15%"
							fill="currentColor"
							className="bi bi-person-plus"
							viewBox="0 0 20 20"
						>
							<path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
							<path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
						</svg>
						Change Password
					</button>
				</li>
				<li>
					<button
						style={buttonStyle(signOutHover)}
						onMouseEnter={() => setSignOutHover(true)}
						onMouseLeave={() => setSignOutHover(false)}
						onClick={handleSignOut}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15%"
							height="15%"
							fill="currentColor"
							className="bi bi-person-plus"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
							/>
							<path
								fillRule="evenodd"
								d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
							/>
						</svg>
						Sign Out
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;

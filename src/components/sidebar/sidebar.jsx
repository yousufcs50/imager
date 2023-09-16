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
	backgroundColor: isHovered ? "#b2d85f" : "#212529",
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
						Create User
					</button>
				</li>
				<li>
					<button
						style={buttonStyle(signOutHover)}
						onMouseEnter={() => setSignOutHover(true)}
						onMouseLeave={() => setSignOutHover(false)}
						onClick={handleSignOut}
					>
						Sign Out
					</button>
				</li>
				<li>
					<button
						style={buttonStyle(passwordHover)}
						onMouseEnter={() => setpasswordHover(true)}
						onMouseLeave={() => setpasswordHover(false)}
						onClick={change_password}
					>
						Change Password
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;

import React, { useState, useEffect } from "react";
import logo from "../icons/folder.ico";
import { getUserId } from "../token_check";
import Sidebar from "./sidebar/sidebar";
import { host, dashbaord_controller } from "../constants";
import axios from "axios";

const dashboardStyle = {
	display: "flex",
	height: "100vh",
	fontFamily: '"Lato", sans-serif',
};

const content = {
	flex: 1,
	padding: "2%",
	backgroundColor: "#ebf4f1",
	height: "100%",
};
const containerStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
};
const foldersStyle = {
	flex: 1,
	padding: "2%",
	display: "flex",
	flexWrap: "wrap",
	gap: "2%",
};
const separator = {
	margin: "20px 0",
	border: "0",
	borderTop: "1px solid ",
};
const folderStyle = (isHovered) => ({
	// your existing styles
	width: "20%",
	textAlign: "center",
	backgroundColor: isHovered ? "#D3D3D3" : "#ebf4f1",
});
const buttonStyle = {
	padding: "2% 2%",
	display: "space-around",
	backgroundColor: "#4CAF50",
	border: "none",
	borderRadius: "0.5em",
	color: "white",
	boxShadow: "0.2% 0 1% rgba(0, 0, 0, 0.1)",
	cursor: "pointer",
};
const popupStyle = {
	position: "fixed",
	justifyContent: "space-between",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#E6F7FF",
	padding: "2% 2%",
	width: "30%",
	boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
	borderRadius: "0.5em",
	zIndex: 1000,
};

function Dashboard() {
	{
		const [showPopup, setShowPopup] = useState(false);
		const [showPopup2, setShowPopup2] = useState(false);
		const [folderToDelete, setFolderToDelete] = useState(null);
		const [hoveredFolder, setHoveredFolder] = useState(null);
		const [folders, setFolders] = useState([]);
		const token = sessionStorage.getItem("token");
		const name = getUserId(sessionStorage.getItem("token"));
		const onHover = (index) => {
			setHoveredFolder(index);
		};

		const onLeave = () => {
			setHoveredFolder(null);
		};

		const handleAddFolder = async (folderName) => {
			{
				const api = host + dashbaord_controller + "create-folder";
				const data = { user: name, folder: folderName };
				try {
					const response = await axios.post(api, data, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});
					console.log(response.data.message);
				} catch (error) {
					console.log(error);
				}
				setShowPopup(false);
			}
		};
		const getfolders = async () => {
			const api = host + dashbaord_controller + "get-folders";
			const data = { user: name };
			try {
				const response = await axios.post(api, data, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				// setFolders(response.data.folders);
				const folders_get = response.data.folders;
				setFolders(folders_get);
			} catch (error) {
				console.log(error);
			}
		};
		const handleDeleteClick = (folderName) => {
			setFolderToDelete(folderName);
			setShowPopup2(true);
		};

		const handleDeleteConfirmation = () => {
			if (folderToDelete) {
				deleteFolder(folderToDelete);
			}
			setShowPopup2(false);
		};
		useEffect(() => {
			//Runs on every render
			getfolders();
		});
		const deleteFolder = async (folder) => {
			const api = host + dashbaord_controller + "delete-folder/" + folder;
			try {
				const response = await axios.delete(api, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
			} catch (error) {
				console.log(error);
			}
		};

		return (
			<div style={dashboardStyle}>
				<Sidebar />
				<div style={content}>
					<div style={containerStyle}>
						<h2>Welcome {name}</h2>
						<button style={buttonStyle} onClick={() => setShowPopup(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-plus-lg"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
								/>
							</svg>
							Create New Folder
						</button>
					</div>
					<hr style={separator} />
					<div style={foldersStyle}>
						{folders.map((folder, index) => (
							<div
								key={index}
								style={folderStyle(index === hoveredFolder)}
								onMouseEnter={() => onHover(index)}
								onMouseLeave={onLeave}
							>
								<a
									href={"/preds/" + folder}
									style={{ color: "inherit", textDecoration: "none" }}
								>
									<img src={logo} alt="Folder Icon" />
									<h4>{folder}</h4> {/* Color set to white */}
								</a>
								<button
									type="button"
									class="btn btn-outline-danger"
									onClick={() => handleDeleteClick(folder)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-trash-fill"
										viewBox="0 0 16 16"
									>
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
									</svg>
									Delete
								</button>
							</div>
						))}
					</div>
					{showPopup && (
						<div style={popupStyle}>
							<p>
								Note: folder names have to be unique please try again with a new
								folder name if the folder is not created
							</p>
							<input type="text" placeholder="Folder Name" id="folderName" />
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<button
									style={buttonStyle}
									onClick={() =>
										handleAddFolder(document.getElementById("folderName").value)
									}
								>
									Create
								</button>
								<button style={buttonStyle} onClick={() => setShowPopup(false)}>
									Cancel
								</button>
							</div>
						</div>
					)}
					{showPopup2 && (
						<div className="popup">
							<div style={popupStyle}>
								<h4>
									Are you sure you want to delete folder {folderToDelete}?
								</h4>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<button
										style={buttonStyle}
										onClick={handleDeleteConfirmation}
									>
										Yes
									</button>
									<button
										style={buttonStyle}
										onClick={() => setShowPopup2(false)}
									>
										No
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Dashboard;

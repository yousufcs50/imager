import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyModal from "./Modal/modal";
import { host, pred_controller } from "../constants.js";
import { uploadToS3, downloads } from "../utils.js";
import Sidebar from "./sidebar/sidebar.jsx";

const dashboardStyle = {
	display: "flex",
	height: "100vh",
	fontFamily: '"Lato", sans-serif',
};

const sidebarStyle = {
	width: "20%",
	backgroundColor: "#d7e8e3",
	padding: "2%",
	height: "100%",
	boxShadow: "0.2% 0 1% rgba(0, 0, 0, 0.1)",
};

const content = {
	flex: 1,
	padding: "2%",
	backgroundColor: "#ebf4f1",
	height: "100%",
};

const mainContainerStyle = {
	width: "80%",
	margin: "auto",
	padding: "2%",
	backgroundColor: "#f7f7f7",
};

const stepContainerStyle = {
	padding: "1%",
};

const uploadLabel = {
	fontSize: "1em",
	margin: "1% 0",
};

const uploadInput = {
	margin: "1% 0",
};

const predictionButton = {
	backgroundColor: "#007bff",
	color: "white",
	padding: "1% 2%",
	border: "none",
	borderRadius: "0.4em",
	cursor: "pointer",
};

const messageStyle = {
	color: "green",
	margin: "1% 0",
};

const separator = {
	margin: "2% 0",
};

function Preds() {
	const { folderName } = useParams();
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [uploadCompleteMessage, setUploadCompleteMessage] = useState(false);
	const [uploadmessage, setuploadmessage] = useState("");
	const token = sessionStorage.getItem("token");

	const handleFileUpload = async (event) => {
		const files = Array.from(event.target.files);
		setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
		try {
			const totalFiles = files.length;

			const uploadPromises = files.map(async (file, index) => {
				if (file) {
					await uploadToS3(folderName, file);
					setuploadmessage(`Uploaded ${index + 1}/${totalFiles} files`);
					setUploadCompleteMessage(true);
				}
			});
			await Promise.all(uploadPromises);
		} catch (error) {
			console.log(error);
			setModalMessage("Error uploading file");
			setShowModal(true);
		}
	};

	const pred_folder = async () => {
		try {
			const link = "s3://canyon-creek-cuts/" + folderName + "/";
			const folder = folderName + "/";
			const data = { s3_directory_url: link, s3_folder: folder };
			const pred_controller = "predict_images/";
			const api = host + pred_controller + "predict";
			const response = await axios.post(api, JSON.stringify(data), {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			// Check if the response contains the s3_directory_url key
			// if (response.data.s3_directory_url) {
			setModalMessage(
				response.data.number_of_files + " files ready to be downloaded"
			);
			setShowModal(true);
		} catch (error) {
			console.error("Error in request:", error);
			return null;
		}
	};

	return (
		<div style={dashboardStyle}>
			<Sidebar />
			<div style={content}>
				<div style={mainContainerStyle}>
					<div style={stepContainerStyle}>
						<h2>Step 1:</h2>
						<label style={uploadLabel}>Upload Files:</label>
						<input
							type="file"
							style={uploadInput}
							multiple
							onChange={handleFileUpload}
						/>
						{uploadCompleteMessage && (
							<div style={messageStyle}>{uploadmessage}</div>
						)}
					</div>
					<hr style={separator} />

					<div style={stepContainerStyle}>
						<h2>Step 2:</h2>
						<button style={predictionButton} onClick={pred_folder}>
							Get Predictions
						</button>
					</div>
					<hr style={separator} />

					<div style={stepContainerStyle}>
						<h2>Step 3:</h2>
						<button
							style={predictionButton}
							onClick={() => downloads(folderName)}
						>
							Download All Files
						</button>
					</div>
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
}

export default Preds;

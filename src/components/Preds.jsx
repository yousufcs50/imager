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

const predictionButton = (isHovered) => ({
	backgroundColor: isHovered ? "#3a8d40" : "#4CAF50",
	color: "white",
	padding: "1% 2%",
	border: "none",
	borderRadius: "0.4em",
	cursor: "pointer",
});

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
	const [predshover, setpredshover] = useState(false);
	const [downloadHover, setdownloadHover] = useState(false);
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
						<button
							style={predictionButton(predshover)}
							onMouseEnter={() => setpredshover(true)}
							onMouseLeave={() => setpredshover(false)}
							onClick={pred_folder}
						>
							Get Predictions
						</button>
					</div>
					<hr style={separator} />

					<div style={stepContainerStyle}>
						<h2>Step 3:</h2>
						<button
							style={predictionButton(downloadHover)}
							onMouseEnter={() => setdownloadHover(true)}
							onMouseLeave={() => setdownloadHover(false)}
							onClick={() => downloads(folderName)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-file-earmark-arrow-down-fill"
								viewBox="0 0 20 20"
							>
								<path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
							</svg>
							Download all files
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

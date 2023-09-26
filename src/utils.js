const AWS = require("aws-sdk");
const JSZip = require("jszip");
AWS.config.update({
	// Example: Create an S3 client
	accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
	region: process.env.REACT_APP_REGION, // e.g., 'us-west-1'
	// Never hard-code credentials in the browser for security reasons
	// Use Amazon Cognito or another method to obtain temporary credentials
});

const getContentType = (fileName) => {
	const extension = fileName.split(".").pop().toLowerCase();
	switch (extension) {
		case "jpg":
		case "jpeg":
			return "image/jpeg";
		case "png":
			return "image/png";
		// Return null or undefined if the file type is not supported
		default:
			return null;
	}
};

export const uploadToS3 = async (folderName, file) => {
	const s3 = new AWS.S3();
	const key = `${folderName}/${file.name}`;
	const params = {
		Bucket: "canyon-creek-cuts",
		Key: key, // Filename you want to save as in S3
		Body: file,
		ContentType: getContentType(file.name),
		// ACL: 'public-read'  // If you want the file to be publicly accessible
	};

	try {
		const response = await s3.upload(params).promise();
		console.log("Upload successful:", response);
	} catch (error) {
		console.log("Upload error:", error);
	}
};

// Validation function that aggregates all individual functions
export const validatePassword = (password) => {
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\.-]{8,}$/;
	return re.test(password);
};

// export const downloads = async (folder) => {
// 	try {
// 		const s3 = new AWS.S3();
// 		const bucketName = "canyon-creek-cuts";
// 		const s3_folder = `cropped_images/${folder}/Predicted_images/`;
// 		const zip = new JSZip();

// 		// List all objects in the folder
// 		const params = {
// 			Bucket: bucketName,
// 			Prefix: s3_folder,
// 		};
// 		const { Contents } = await s3.listObjectsV2(params).promise();

// 		// Download and add each file to the ZIP
// 		const downloadPromises = Contents.map(async (content) => {
// 			const downloadParams = {
// 				Bucket: bucketName,
// 				Key: content.Key,
// 			};
// 			const data = await s3.getObject(downloadParams).promise();
// 			const fileName = content.Key.split("/").pop();
// 			console.log("Downloaded file", fileName);
// 			zip.file(fileName, data.Body);
// 		});

// 		await Promise.all(downloadPromises);
// 		// Generate the ZIP file
// 		console.log("Generating", folder);
// 		const blob = await zip.generateAsync({ type: "blob" });

// 		// Create blob link to download
// 		const url = window.URL.createObjectURL(blob);
// 		const link = document.createElement("a");
// 		link.href = url;
// 		link.setAttribute("download", `segmented_${folder}.zip`);
// 		document.body.appendChild(link);
// 		link.click();
// 		link.parentNode.removeChild(link);
// 	} catch (err) {
// 		console.log("Error", err);
// 		alert(err);
// 	}
// };

export const downloads = async (folder) => {
	try {
		// List all objects in the folder
		const zip = new JSZip();
		const s3 = new AWS.S3();
		const bucketName = "canyon-creek-cuts";
		const s3_folder = `cropped_images/${folder}//Predicted_images/`;

		const params = {
			Bucket: bucketName,
			Prefix: s3_folder, // if your folder is named 'my-folder/', set Prefix: 'my-folder/'
		};
		const { Contents } = await s3.listObjectsV2(params).promise();
		console.log(Contents);
		// Download each file
		for (let content of Contents) {
			const downloadParams = {
				Bucket: bucketName,
				Key: content.Key,
			};
			const data = await s3.getObject(downloadParams).promise();

			// // Create blob link to download
			// const url = window.URL.createObjectURL(new Blob([data.Body]));
			// const link = document.createElement("a");
			// link.href = url;
			// link.setAttribute("download", content.Key.split("/").pop()); // Set the file name to the last part of the Key
			// document.body.appendChild(link);
			// link.click();
			// link.parentNode.removeChild(link);
			const fileName = content.Key.split("/").pop();
			console.log("Downloaded file", fileName);
			zip.file(fileName, data.Body);
		}
		console.log("Generating", folder);
		const blob = await zip.generateAsync({ type: "blob" });

		// Create blob link to download
		const url = window.URL.createObjectURL(blob); // Use the blob from zip.generateAsync
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `segmented_${folder}.zip`);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	} catch (err) {
		console.log("Error", err);
		alert(err);
	}
};

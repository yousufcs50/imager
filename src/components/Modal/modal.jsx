import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const buttonStyle = {
	padding: "2% 2%",
	display: "space-around",
	backgroundColor: "#b2d85f",
	border: "none",
	borderRadius: "0.5em",
	color: "white",
	boxShadow: "0.2% 0 1% rgba(0, 0, 0, 0.1)",
	cursor: "pointer",
	transition: "background-color 0.3s",
};
const MyModal = (props) => {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				<Button style={buttonStyle} onClick={props.handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default MyModal;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button } from "react-bootstrap";
import QrCodeContainer from "./QrCodeContainer";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function QrCodeModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const { getParams } = props;

	const handleOpen = () => {
		if (!localStorage.getItem("user")) {
			window.location.href = "register-login?q=login";
		} else setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div className="p-3">
				<div id="simple-modal-description">
					<QrCodeContainer handleClose={handleClose} getParams={getParams} />
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<Button
				style={{
					border: "0",
					backgroundColor: "#343A40",
					color: "white",
					position: "static",
					marginLeft: "5px",
				}}
				onClick={handleOpen}
			>
				QR Code
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button } from "react-bootstrap";

import RoomIcon from "@material-ui/icons/Room";

import MapContainer from "./MapContainer";

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
		width: "75%",
		height: "720px",
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function MapModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const { data } = props;
	const location = {
		adress: data.address,
		lat: data.lat,
		lng: data.lng,
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div>
				<MapContainer location={location} />
			</div>
		</div>
	);

	return (
		<div>
			<Button
				style={{
					backgroundColor: "#343A40",
					color: "white",
					border: "0px",
				}}
				onClick={handleOpen}
			>
				<RoomIcon />
				View on Map
			</Button>
			<Modal open={open} onClose={handleClose}>
				{body}
			</Modal>
		</div>
	);
}

import React from "react";

import { Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";

import { addQuestion } from "../../../../api/apiCalls";
import swal from "sweetalert";

class QuestionModal extends React.Component {
	constructor() {
		super();
		this.state = {
			question: "",
			errors: {},
			open: false,
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onChange = (event) => {
		const { value, name } = event.target;
		const errors = { ...this.state.errors };
		value === ""
			? (errors[name] = `Must be filled.`)
			: (errors[name] = undefined);
		this.setState({
			[name]: value,
			errors,
		});
	};
	onClick = async (event) => {
		if (this.state.question.trim() === "") {
			swal({
				title: "Warning!",
				text: "Blank must be filled.",
				icon: "warning",
				dangerMode: true,
			});
		} else {
			const { id } = this.props;
			const { question } = this.state;
			const params = {
				activityId: id,
				text: question,
			};
			try {
				const response = await addQuestion(params);
				await swal({
					title: "Good job!",
					text: response.data,
					icon: "success",
				});
				this.handleClose();
				this.props.getQuestion();
			} catch (error) {
				swal({
					title: error.response.data.message,
					icon: "warning",
					dangerMode: true,
				});
			}
		}
	};

	render() {
		const body = (
			<div
				style={{
					top: `50%`,
					left: `50%`,
					transform: `translate(-50%, -50%)`,
					position: "absolute",
					width: "40%",
					height: "35%",
					backgroundColor: "#e3e3e3",
				}}
			>
				<textarea
					name="question"
					type="text"
					placeholder="Enter Your question"
					className={
						"w-100 p-4 " +
						(this.state.errors["question"]
							? "form-control is-invalid"
							: "form-control")
					}
					style={{ fontSize: "18px", height: "85%" }}
					onChange={this.onChange}
				/>
				<Button
					className="w-100"
					style={{ backgroundColor: "darkblue", border: "0px", height: "57px" }}
					onClick={this.onClick}
				>
					Add Question
				</Button>
			</div>
		);
		return (
			<div>
				<Button
					style={{ backgroundColor: "darkblue" }}
					className="p-3 w-100"
					onClick={this.handleOpen}
				>
					<AddIcon /> <strong>Add Question</strong>
				</Button>
				<Modal open={this.state.open} onClose={this.handleClose}>
					{body}
				</Modal>
			</div>
		);
	}
}
export default QuestionModal;

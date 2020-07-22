import React from "react";

import { Input } from "../guest/Input";
import { Button } from "react-bootstrap";

import { getAskedQuestions } from "../../../../api/apiCalls";
import { makeEnrollment } from "../../../../api/apiCalls";

class QuestionList extends React.Component {
	constructor() {
		super();
		this.state = {
			questions: [],
			errors: {},
			givenAnswers: {},
		};
	}
	componentDidMount = async (event) => {
		try {
			const { activityId } = this.props.data;
			const params = {
				activityId,
			};
			const response = await getAskedQuestions(params);
			this.setState({ questions: response.data });
		} catch (error) {}
	};

	onChange = (event) => {
		const { value, name } = event.target;
		const errors = { ...this.state.errors };
		value === ""
			? (errors[name] = `Must be filled.`)
			: (errors[name] = undefined);
		const givenAnswers = { ...this.state.givenAnswers };
		givenAnswers[name] = {
			answerText: value,
		};
		this.setState({
			givenAnswers,
			errors,
		});
	};
	isThereError = () => {
		const { givenAnswers, questions } = this.state;
		if (Object.keys(givenAnswers).length !== Object.keys(questions).length)
			return true;
		else {
			for (var key in givenAnswers) {
				if (givenAnswers[key]["answerText"] === "") return true;
			}
			return false;
		}
	};

	onClick = async (event) => {
		if (!this.isThereError()) {
			try {
				const body = await this.props.getParams();
				body["givenAnswers"] = this.state.givenAnswers;
				const response = await makeEnrollment(body);
				alert(response.data);
				window.location.reload();
			} catch (error) {
				alert(error.response);
			}
		} else {
			alert("All blanks must be filled...");
		}
	};
	render() {
		const { questions } = this.state;
		return (
			<div>
				{questions.map((row, index) => (
					<Input
						key={index + 1}
						label={row.text}
						name={row.id}
						type="text"
						placeholder="Enter Your Answer"
						onChange={this.onChange}
						error={this.state.errors[row.id]}
					/>
				))}

				<Button
					className="mr-3 mt-3"
					style={{ backgroundColor: "black", color: "white" }}
					onClick={this.onClick}
				>
					Enroll
				</Button>
			</div>
		);
	}
}
export default QuestionList;

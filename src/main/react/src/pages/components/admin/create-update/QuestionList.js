import React from "react";

import { getAskedQuestions } from "../../../../api/apiCalls";
import Question from "./Question";
import { Card, Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";

class QuestionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		};
	}
	componentDidMount = async (event) => {
		this.getQuestion();
	};

	getQuestion = async () => {
		try {
			const { id } = this.props;
			const params = {
				activityId: id,
			};
			const response = await getAskedQuestions(params);
			this.setState({ questions: response.data });
		} catch (error) {}
	};

	render() {
		return (
			<Card
				style={{
					backgroundColor: "whitesmoke",
					height: "100%",
				}}
			>
				<Button style={{ backgroundColor: "darkblue" }} className="p-3">
					<AddIcon /> <strong>Add Question</strong>
				</Button>
				{this.state.questions.map((row) => (
					<Question key={row.id} getQuestion={this.getQuestion} data={row} />
				))}
			</Card>
		);
	}
}
export default QuestionList;

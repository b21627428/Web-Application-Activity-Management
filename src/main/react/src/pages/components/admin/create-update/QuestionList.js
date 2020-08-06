import React from "react";

import { getAskedQuestions } from "../../../../api/apiCalls";
import Question from "./Question";
import { Card } from "react-bootstrap";
import QuestionModal from "./QuestionModal";

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
				<QuestionModal id={this.props.id} getQuestion={this.getQuestion} />
				{this.state.questions.map((row) => (
					<Question key={row.id} getQuestion={this.getQuestion} data={row} />
				))}
			</Card>
		);
	}
}
export default QuestionList;

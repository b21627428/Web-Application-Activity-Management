import React from "react";
import { Bar } from "react-chartjs-2";

class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Friday",
				],
				datasets: [
					{
						label: "Count",
						data: [],
						backgroundColor: [
							"gray",
							"darkblue",
							"darkgreen",
							"darkorange",
							"darkred",
							"black",
							"#343A40",
						],
					},
				],
			},
		};
	}
	render() {
		if (this.props.data) {
			const { data } = this.props;
			const { chartData } = this.state;
			chartData.datasets[0].data = [
				data.Monday,
				data.Tuesday,
				data.Wednesday,
				data.Thursday,
				data.Friday,
				data.Saturday,
				data.Sunday,
			];
		}

		return (
			<div className="chart">
				<Bar
					data={this.state.chartData}
					height={125}
					options={{
						title: {
							display: true,
							text: "Count of Enrollment By Day",
							fontSize: 25,
						},
						legend: {
							display: true,
							position: "top",
							labels: {
								fontColor: "#000",
							},
						},
						layout: {
							padding: {
								left: 50,
								right: 50,
								bottom: 0,
								top: 0,
							},
						},
						tooltips: {
							enabled: true,
						},
						scales: {
							xAxes: [{ barPercentage: 0.2 }],
							yAxes: [
								{
									ticks: {
										beginAtZero: true,
										min: 0,
										max: Math.max(...this.state.chartData.datasets[0].data),
									},
								},
							],
						},
					}}
				/>
			</div>
		);
	}
}
export default Chart;

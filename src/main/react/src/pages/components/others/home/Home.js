import React from "react";

import ActivityList from "./ActivityList";

import styles from "./mystyle.module.css";

class Home extends React.Component {
	render() {
		return (
			<div className={styles.home}>
				<ActivityList />
			</div>
		);
	}
}
export default Home;

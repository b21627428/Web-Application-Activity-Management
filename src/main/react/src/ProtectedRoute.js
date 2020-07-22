import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				const user = JSON.parse(localStorage.getItem("user"));
				if (user == null) {
					if (Component.name === "Profile") {
						return (
							<Redirect
								to={{
									pathname: "/",
									state: {
										from: props.location,
									},
								}}
							/>
						);
					}
					return <Component {...props} />;
				} else if (user != null) {
					console.log(Component.name);
					if (Component.name === "RegisterLogin") {
						return (
							<Redirect
								to={{
									pathname: "/",
									state: {
										from: props.location,
									},
								}}
							/>
						);
					}
					return <Component {...props} />;
				}
			}}
		/>
	);
};

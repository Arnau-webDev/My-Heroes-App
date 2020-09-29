import React, { useContext } from 'react';
import { types } from '../../types/types';
import { AuthContext } from '../../auth/AuthContext';

export const LoginScreen = ({ history }) => {
	const lastPathVisited = localStorage.getItem("lastPath");
	const { dispatch } = useContext(AuthContext);

	const handleLogin = () => {
		dispatch({
			type: types.login,
			payload: {name: "Arnau", logged: false}
		});
		
		if(!!lastPathVisited) {
			history.replace(lastPathVisited);
		} else {
			history.replace('/');
		}
	};

	return (
		<div className="container mt-5">
			<h1>Login Screen</h1>
			<hr />

			<button className="btn btn-primary" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};

import React, { useContext } from 'react';
import { types } from '../../types/types';
import { AuthContext } from '../../auth/AuthContext';

export const LoginScreen = ({ history }) => {
	const { dispatch } = useContext(AuthContext);

	const handleLogin = () => {
		const lastPathVisited = localStorage.getItem('lastPath') || '/';

		dispatch({
			type: types.login,
			payload: { name: 'Arnau', logged: false },
		});

		history.replace(lastPathVisited);
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

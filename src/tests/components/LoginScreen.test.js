import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../components/login/LoginScreen';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas LoginScreen', () => {
	const contextValue = {
		user: { name: 'Pepe', logged: true },
		dispatch: jest.fn(),
		history: { replace: jest.fn() },
	};

	const wrapper = mount(
		<AuthContext.Provider value={contextValue}>
			<LoginScreen history={contextValue.history} />
		</AuthContext.Provider>
	);

	test('Debe de mostrarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe realizar el dispatch y la navegación', () => {
		const handleClick = wrapper.find('button').prop('onClick');

		handleClick();

		expect(contextValue.dispatch).toHaveBeenCalled();
		expect(contextValue.history.replace).toHaveBeenCalledWith('/');

		localStorage.setItem('lastPath', '/marvel');
		handleClick();
		expect(contextValue.history.replace).toHaveBeenCalledWith('/marvel');
	});
});

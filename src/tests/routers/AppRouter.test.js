import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


describe('Pruebas en AppRouter', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('Debe de mostrar el login si no esta autentificado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
			    <AppRouter />
		    </AuthContext.Provider>
        );

        expect(wrapper.find("button").exists()).toBe(true);
    });
    
    test('Debe de mostrar el componente marvel si esta autentificado', () => {

        const contextValueTest = {
            dispatch: jest.fn(),
            user: {
                name: "Arnau",
                logged: true,
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValueTest }>
			    <AppRouter />
		    </AuthContext.Provider>
        );

        expect(wrapper.find(".navbar").exists()).toBe(true);
    });
})

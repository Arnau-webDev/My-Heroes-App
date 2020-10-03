import React from 'react';
import { mount } from 'enzyme';
import { Navbar } from '../../components/ui/NavBar';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../types/types';

describe('Pruebas en Navbar', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const props = {
        user: {name: "Pedro", logged: true},
        dispatch: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={props}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrar el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('Debe llamar la funcion handleLogout y usar el history', () => {
        wrapper.find("button").simulate("click");

        expect(props.dispatch).toHaveBeenCalled();
        expect(props.dispatch).toHaveBeenCalledWith({type: types.logout, payload: {}});
        expect(historyMock.replace).toHaveBeenCalledWith("/login");        
    })
    
    
})

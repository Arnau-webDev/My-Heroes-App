import React from 'react';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas en el dashboarRoutes', () => {

    const props = {
        user: {name: "Pedro", logged: true},
        dispatch: jest.fn(),
    };

    test('Debe mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={props}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text()).toBe(props.user.name);
    })

    
})

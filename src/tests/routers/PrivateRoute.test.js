import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';


describe('Pruebas en PrivateRoute', () => {

    const props = {
        location: {
            pathname: "/marvel",
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('Debe mostrar el componente si esta loggeado y guardar localstorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component= {() => <span>Componente de prueba</span>}
                    {...props}
                />
            </MemoryRouter>
        )

        console.log(wrapper.html());
        expect(wrapper.find("span").exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    });

    test('Debe no mostrar el componente si el usuario no esta loggeado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component= {() => <span>No deberia ser renderizado</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find("span").exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    })
    
    
})

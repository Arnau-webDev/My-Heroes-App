import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en heroScreen', () => {
    const mockHistory = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }
    
    test('Debe de mostrar el componente reidrect si no hay argumentos en la url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <HeroScreen history={mockHistory}/>
            </MemoryRouter>
        );
        expect(wrapper.find("Redirect").exists()).toBe(true);
    })

    test('Debe mostrar el componente Hero si hay argumentos en la URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path="/hero/:heroeId" >
                    <HeroScreen history={mockHistory}/>
                </Route>
            </MemoryRouter>
        );

        expect(wrapper.find(".row").exists()).toBe(true);
        
    })

    test('Debe de regresar a la pantalla anterior', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={mockHistory} />}    
                />
            </MemoryRouter>
        );

        wrapper.find("button").simulate("click");

        expect(mockHistory.goBack).toHaveBeenCalled();
        expect(mockHistory.push).toHaveBeenCalledTimes(0);
    })
    
    test('Debe hacer push al historial', () => {
        const mockHistory = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={mockHistory} />}    
                />
            </MemoryRouter>
        );

        wrapper.find("button").simulate("click");

        expect(mockHistory.push).toHaveBeenCalled();
        expect(mockHistory.goBack).toHaveBeenCalledTimes(0);
    })

    test('Debe hacer redirect si los argumentos de la URL son incorrectos', () => {
        const mockHistory = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spide212121212r"]}>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={mockHistory} />}    
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toEqual("");
    })
})

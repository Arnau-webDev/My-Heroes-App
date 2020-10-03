import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../components/search/SearchScreen';

describe('Pruebas en el componente SearchScreen', () => {
	test('Debe mostrarse el compoennte con los valores por defecto', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/search']}>
				<Route path="/search" component={SearchScreen} />
			</MemoryRouter>
		);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('h4').text()).toBe('Search Form');
	});

	test('Debe de mostrar al hero Batman', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/search?q=batman']}>
				<Route path="/search" component={SearchScreen} />
			</MemoryRouter>
		);

		expect(wrapper.find('input').prop('value')).toBe('batman');
	});
});

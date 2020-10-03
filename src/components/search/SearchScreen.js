import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { useForm } from '../../hooks/useForm';

export const SearchScreen = ({ history }) => {
	const location = useLocation();
	const { q = '' } = queryString.parse(location.search);

	const [formValues, handleInputChange, reset] = useForm({
		searchText: q,
	});
	const { searchText } = formValues;

	const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

	const handleSearch = (e) => {
		e.preventDefault();
		history.push(`?q=${searchText}`);
		reset();
	};

	return (
		<div className="animate__animated animate__fadeIn">
			<div className="row">
				<div className="col">
					<h4>Search Form</h4>
					<form className="form-group" onSubmit={handleSearch}>
						<input
							type="text"
							autoComplete="off"
							placeholder="Find your hero"
							name="searchText"
							className="form-control"
							onChange={handleInputChange}
							value={searchText}
						/>

						<button className="btn mt-3 btn-block btn-outline-primary">
							Search...
						</button>
					</form>
				</div>
			</div>
			<div className="row p-3">
				{heroesFiltered.map((hero) => {
					return <HeroCard hero={hero} key={hero.id} className="col-6" />;
				})}
			</div>
		</div>
	);
};

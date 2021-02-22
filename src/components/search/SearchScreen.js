import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForms';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = useMemo(() => queryString.parse( location.search ), [location.search]);

    const [ formValues, handleInputChange ] = useForm( { searchText: q } );
    const { searchText } = formValues;

    const heroesFilter = useMemo(() => getHeroesByName( q ), [q]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push( `?q=${ searchText }` );
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">

                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />
                            
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>

                </div>

                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    { 
                        ( q === '') 
                            && 
                            <div className="alert alert-info">
                                Search a Hero   
                            </div>
                    }

                    { 
                        ( q !== '' && heroesFilter.length === 0 ) 
                            && 
                            <div className="alert alert-danger">
                                There are no heroes with { q }  
                            </div>
                    }

                    {
                        heroesFilter.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>

            </div>
        </div>
    )
}

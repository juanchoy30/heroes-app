import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Tests on <SearchScreen />', () => {
    

    test('should render correctly with default values', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a Hero');

    });

    test('should show batman and input with the querystring value', () => {

        const query = 'batman'
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${ query }`]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe( query );
        expect( wrapper ).toMatchSnapshot();

    });

    test('should show an error if hero not found', () => {

        const query = 'batmn545642'
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${ query }`]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe(`There are no heroes with ${ query}`);
        expect( wrapper ).toMatchSnapshot();

    });

    test('should call history´s push', () => {
        
        const history = {
            push: jest.fn()
        };

        const query = 'batmn545642'

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${ query }`]}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith(`?q=batman`)

    });
    
    
    
    
})

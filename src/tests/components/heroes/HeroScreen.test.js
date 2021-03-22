import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<HeroScreen /> Tests', () => {
    
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }
    
    test('should show the component redirect if there are no arguments on the URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history } />
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe( true );
        
    });

    test('should show a Hero if parameter exists and is found', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe( true );

    });

    test('should return to the previous page with PUSH', () => {
        
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');   
        expect( history.goBack ).not.toHaveBeenCalled();  

    });

    test('should return to the previous page', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.goBack ).toHaveBeenCalled();
        expect( history.push ).toHaveBeenCalledTimes(0);

    });

    test('should call redirect if hero does not exist', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider85f484-nonexisting']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');

    })
    
    
    
    
    
})

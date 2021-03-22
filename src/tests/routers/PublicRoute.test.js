import React from 'react';
import { mount } from 'enzyme'; 
import { MemoryRouter } from 'react-router-dom';
import { PublicRoute } from '../../routers/PublicRoute';


describe('<PublicRoute /> Tests', () => {
    
    const props = {
        location: {
            pathname: '/login'
        }
    }

    test('should show the component if not authenticated', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PublicRoute 
                    isAuthenticated={ false }
                    component={ () => <span>Not looged, it should be shown</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( true );

    });

    test('should block the component if authenticated', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PublicRoute 
                    isAuthenticated={ true }
                    component={ () => <span>Not looged, it should be shown</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( false );
        
    });
    
})

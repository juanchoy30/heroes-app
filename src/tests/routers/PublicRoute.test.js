import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // *1
import { mount, configure } from 'enzyme'; // *1
import { MemoryRouter } from 'react-router-dom';
import { PublicRoute } from '../../routers/PublicRoute';

configure({adapter: new Adapter()}); 

// *1 This feature was not in the course. I found it on stackOverFlow, It seems to be
// a problem with the wojtekmaj adapter patch for enzima-react17. 

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

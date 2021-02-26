import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // *1
import { mount, configure } from 'enzyme'; // *1
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';

configure({adapter: new Adapter()}); 

// *1 This feature was not in the course. I found it on stackOverFlow, It seems to be
// a problem with the wojtekmaj adapter patch for enzima-react17. 

describe('<PrivateRoute /> Tests', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }
    
    test('should show the component if authenitcated, and then save in localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ true }
                    component={ () => <span>Ready!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( true );

    });
    

})

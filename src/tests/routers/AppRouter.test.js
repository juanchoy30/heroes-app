import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // *1
import { configure, mount } from 'enzyme'; // *1
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

configure({adapter: new Adapter()}); 

// *1 This feature was not in the course. I found it on stackOverFlow, It seems to be
// a problem with the wojtekmaj adapter patch for enzima-react17. 

describe('<AppRouter /> Tests', () => {

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };
    
    test('should render loggin component if not authenticated', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contexValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();

    });

    test('should render Marvel component if authenticated', () => {

        const contexValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Juan'
            }
        };
        
        const wrapper = mount(
            <AuthContext.Provider value={ contexValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper.find('.navbar').exists() ).toBe( true );

    });
    
    

})

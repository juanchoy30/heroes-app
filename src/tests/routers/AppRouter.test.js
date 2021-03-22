import React from 'react';
import { mount } from 'enzyme'; // *1
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


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

import React from 'react';
import { mount } from 'enzyme'; 
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('<Navbar /> tests', () => {

    const historyMock = {
        replace: jest.fn(),
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Juan'
        }
    };
    
    const wrapper = mount(
        <AuthContext.Provider value={ contexValue }>
            <MemoryRouter>
                    <Navbar />
                <Router history={ historyMock }>
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should render correctly', () => {
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Juan');

    });

    test('should call logout and use history', () => {
        
        wrapper.find('button').prop('onClick')();

         expect( contexValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
         });

         expect( historyMock.replace ).toHaveBeenCalledWith('/login');

    });
    
});

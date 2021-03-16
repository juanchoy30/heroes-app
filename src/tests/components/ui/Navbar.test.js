import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // *1
import { configure, mount } from 'enzyme'; // *1
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';

configure({adapter: new Adapter()}); 

// *1 This feature was not in the course. I found it on stackOverFlow, It seems to be
// a problem with the wojtekmaj adapter patch for enzima-react17. 

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

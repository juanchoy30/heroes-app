import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // *1
import { configure, mount } from 'enzyme'; // *1
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';

configure({adapter: new Adapter()}); 

// *1 This feature was not in the course. I found it on stackOverFlow, It seems to be
// a problem with the wojtekmaj adapter patch for enzima-react17. 

describe('<DashboardRoutes /> Tests', () => {

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            user: 'Juan Miguel'
        }
    };
    
    test('should render correctly', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contexValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();

    });
    

});

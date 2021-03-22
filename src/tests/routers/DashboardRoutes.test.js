import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';

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

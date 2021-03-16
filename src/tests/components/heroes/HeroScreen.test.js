import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // *1
import { configure, mount } from 'enzyme'; // *1
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter } from 'react-router-dom';

configure({adapter: new Adapter()}); 

// *1 This feature was not in the course. I found it on stackOverFlow, It seems to be
// a problem with the wojtekmaj adapter patch for enzima-react17. 

describe('<HeroScreen /> Tests', () => {
    
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }
    
    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen history={ history } />
        </MemoryRouter>

    );

    test('should show the component redirect if there are no arguments on the URL', () => {

        expect( wrapper.find('Redirect').exists() ).toBe( true );
        
    })
    
})

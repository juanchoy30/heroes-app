import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';


describe('authReducer tests', () => {

    test('should return the defaul state', () => {

        const state = authReducer( { logged: false }, {} );
        expect( state ).toEqual({ logged: false });
        
    });
    
    test('should authenticate, put the username and the logged in true', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Juan'
            }
        };

        const state = authReducer( { logged: false } , action );
        expect( state ).toEqual({
            logged: true,
            name: 'Juan'
        });

    });

    test('should delete the username and put logged in false', () => {

        const action = {
            type: types.logout
        };

        const state = authReducer( { logged: true, name:'Miguel' }, action );
        expect( state ).toEqual({ logged: false });

    });

});

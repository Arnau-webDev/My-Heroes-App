import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    const init = {
        name: "Prueba",
        logged: true,
    }

    test('Debe devolver el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({logged: false});
    })

    test('Debe autentificar y colocar el nombre del usuario', () => {
        const state = authReducer({ logged: false }, {
            type: types.login, 
            payload: {name: "Prueba"},
        });

        expect(state).toEqual(init);
    })

    test('Debe de borrar el name del usuario y logged en false', () => {
        const state = authReducer(init, {
            type: types.logout, 
            payload: {},
        });

        expect(state).toEqual({ logged: false });
    })
    
})

import 'reflect-metadata';
import { user_actions } from '../../../application/redux/user.actions';
import UsersMock from '../../../../../mocks/Users.mock.json';
import UsersResponseMock from '../../../../../mocks/UsersResponse.mock.json';

describe('MODULE: USERS | REDUX: actions', () => {
    test('fetch_users_request', () => {
        const expected = {
            type: user_actions.fetch_users_request.type
        }
        expect(user_actions.fetch_users_request()).toEqual(expected);
    });
    test('fetch_users_success', () => {
        const expected = {
            type: user_actions.fetch_users_success.type,
            payload: UsersMock
        }
        expect(user_actions.fetch_users_success(UsersMock)).toEqual(expected);
    });
    test('fetch_users_failure', () => {
        const expected = {
            type: user_actions.fetch_users_failure.type,
            payload: new Error('')
        }
        expect(user_actions.fetch_users_failure(new Error(''))).toEqual(expected);
    });
    test('set_table_options', () => {
        const expected = {
            type: user_actions.set_table_options.type,
            payload: UsersResponseMock
        }
        expect(user_actions.set_table_options(UsersResponseMock)).toEqual(expected);
    });
    test('select_user', () => {
        const expected = {
            type: user_actions.select_user.type,
            payload: UsersMock[0]
        }
        expect(user_actions.select_user(UsersMock[0])).toEqual(expected);
    });
    test('unselect_user', () => {
        const expected = {
            type: user_actions.unselect_user.type,
        }
        expect(user_actions.unselect_user()).toEqual(expected);
    });
    test('edit_user', () => {
        const expected = {
            type: user_actions.edit_user.type,
            payload: UsersMock[0]
        }
        expect(user_actions.edit_user(UsersMock[0])).toEqual(expected);
    });
})
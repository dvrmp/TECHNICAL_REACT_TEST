import { user_actions } from "../../../application/redux/user.actions";
import { usersReducer, users_initial_state } from "../../../application/redux/users.reducer";
import { UsersState } from "../../../domain/interfaces/states/user-state.interface";
import UsersMock from '../../../../../mocks/Users.mock.json';
import UsersResponseMock from '../../../../../mocks/UsersResponse.mock.json';
import User from "../../../domain/entities/user.class";

describe('MODULE: USERS | REDUX: reducer', () => {
    test('Action: fetch_users_success, should modified the state users with an users array', () => {
        const expected: UsersState = {
            ...users_initial_state,
            users: UsersMock
        }
        expect(usersReducer(users_initial_state, user_actions.fetch_users_success(UsersMock))).toEqual(expected);
    });

    test('Action: set_table_options, should modified the state users with an users array', () => {
        const expected: UsersState = {
            ...users_initial_state,
            table_options: {
                page: UsersResponseMock.page,
                per_page: UsersResponseMock.per_page,
                total_pages: UsersResponseMock.total_pages,
                total: UsersResponseMock.total
            }
        }
        expect(usersReducer(users_initial_state, user_actions.set_table_options(UsersResponseMock))).toEqual(expected);
    });

    test('Action: select_user, should modified the state selected with an user', () => {
        const expected: UsersState = {
            ...users_initial_state,
            selected: UsersMock[0]
        }
        expect(usersReducer(users_initial_state, user_actions.select_user(UsersMock[0]))).toEqual(expected);
    });
    test('Action: select_user, should modified the state selected removing an user selected', () => {
        const expected: UsersState = {
            ...users_initial_state,
            selected: null
        }
        expect(usersReducer(users_initial_state, user_actions.unselect_user())).toEqual(expected);
    });
})
import { user_actions } from "../../../application/redux/user.actions";
import { usersReducer, users_initial_state } from "../../../application/redux/users.reducer";
import { UsersState } from "../../../domain/interfaces/states/user-state.interface";
import UsersMock from '../../../../../mocks/Users.mock.json';

describe('MODULE: USERS | REDUX: reducer', () => {
    test('Action: fetch_users_success, should return an array typed as an User class', () => {
        const expected: UsersState = {
            ...users_initial_state,
            users: UsersMock
        }
        expect(usersReducer(users_initial_state, user_actions.fetch_users_success(UsersMock))).toEqual(expected);
    });
})
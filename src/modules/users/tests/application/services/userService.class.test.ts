import 'reflect-metadata';
import { ioc_container } from '../../../../../kernel/ioc/ioc-container';
import { IOC_TYPES } from '../../../../../kernel/ioc/ioc-types';
import UsersMock from '../../../../../mocks/Users.mock.json';
import { user_actions } from '../../../application/redux/user.actions';
import { usersReducer, users_initial_state } from '../../../application/redux/users.reducer';
import UserService from '../../../application/services/userService.class';
import { UsersState } from '../../../domain/interfaces/states/user-state.interface';

describe('MODULE: USERS | SERVICE: UsersService', () => {
    test('[Method: fetchUsersByPage]: Should add to state of users an users array', async () => {
        const userService = ioc_container.get<UserService>(IOC_TYPES.UserService);
        await userService.fetchUsersByPage(2);
        const expected: UsersState = {
            ...users_initial_state,
            users: UsersMock
        }
        expect(usersReducer(users_initial_state, user_actions.fetch_user_success(UsersMock))).toEqual(expected);
    })
});
import 'reflect-metadata';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ioc_container } from '../../../../../kernel/ioc/ioc-container';
import { IOC_TYPES } from '../../../../../kernel/ioc/ioc-types';
import UsersMock from '../../../../../mocks/Users.mock.json';
import UsersResponseMock from '../../../../../mocks/UsersResponse.mock.json';
import { user_actions } from '../../../application/redux/user.actions';
import { usersReducer, users_initial_state } from '../../../application/redux/users.reducer';
import UserService from '../../../application/services/userService.class';
import { UsersState } from '../../../domain/interfaces/states/user-state.interface';
import { routes } from '../../../../../routes/routes';

describe('MODULE: USERS | SERVICE: UsersService', () => {
    test('[Method: fetchUsersByPage]: Should add to state of users an users array', async () => {
        const pageNumber = 2;
        const userService = ioc_container.get<UserService>(IOC_TYPES.UserService);
        const axiosMock = new MockAdapter(axios);
        const fetchData = UsersResponseMock;

        const url = `${routes.get_users_by_page}${pageNumber}`;
        axiosMock.onGet(url).reply(200, fetchData);

        await userService.fetchUsersByPage(2);
        const expected: UsersState = {
            ...users_initial_state,
            users: UsersMock
        }
        expect(usersReducer(users_initial_state, user_actions.fetch_users_success(UsersMock))).toEqual(expected);
    })
});
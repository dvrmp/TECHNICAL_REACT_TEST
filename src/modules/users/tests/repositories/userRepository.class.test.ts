import 'reflect-metadata';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserRepository from '../../infrastucture/repositories/userRepository.class';
import { ioc_container } from '../../../../kernel/ioc/ioc-container';
import { IOC_TYPES } from '../../../../kernel/ioc/ioc-types';
import UsersResponseMock from '../../../../mocks/UsersResponse.mock.json';
import UsersMock from '../../../../mocks/Users.mock.json';
import { routes } from '../../../../routes/routes';
import createMockStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../../../../kernel/redux/store';

describe('MODULE: USERS | REPOSITORY: UserRepository', () => {
    const userRepository = ioc_container.get<UserRepository>(IOC_TYPES.Repository);

    test('[Method: getByPage]: Should return an users array by page from http', async () => {
        const pageNumber = 2;
        const axiosMock = new MockAdapter(axios);
        const fetchData = UsersResponseMock;

        const url = `${routes.get_users_by_page}${pageNumber}`;
        axiosMock.onGet(url).reply(200, fetchData);

        const users = await userRepository.getByPage(pageNumber);
        expect(users).toBeInstanceOf(Array);
    })

    test('[Method: getByPage]: Should return an users array from state', async () => {
        const mockStore = createMockStore<RootState, AppDispatch>();
        const store = mockStore({ users: { users: UsersMock, table_options: null } });
        userRepository.setStore(store);
        const users = userRepository.getAll();
        expect(users).toBeInstanceOf(Array);
    })
});
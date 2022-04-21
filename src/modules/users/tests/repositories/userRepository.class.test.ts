import 'reflect-metadata';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserRepository from '../../infrastucture/repositories/userRepository.class';
import { ioc_container } from '../../../../kernel/ioc/ioc-container';
import { IOC_TYPES } from '../../../../kernel/ioc/ioc-types';
import UsersResponseMock from '../../../../mocks/UsersResponse.mock.json';
import { routes } from '../../../../routes/routes';

describe('MODULE: USERS | REPOSITORY: UserRepository', () => {
    test('[Method: getByPage]: Should return an array', async () => {
        const pageNumber = 2;
        const userRepository = ioc_container.get<UserRepository>(IOC_TYPES.Repository);
        const axiosMock = new MockAdapter(axios);
        const fetchData = UsersResponseMock;

        const url = `${routes.get_users_by_page}${pageNumber}`;
        axiosMock.onGet(url).reply(200, fetchData);

        const users = await userRepository.getByPage(pageNumber);
        expect(users).toBeInstanceOf(Array);
    })
});
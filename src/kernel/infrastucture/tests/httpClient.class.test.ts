import "reflect-metadata";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ioc_container } from '../../ioc/ioc-container';
import { IOC_TYPES } from '../../ioc/ioc-types';
import { Communication } from "../../interfaces/communication.interface";
import HttpClient from "../httpClient.class";

describe('Service: HttpClient', () => {

    const URL: string = 'https://reqres.in/api/users?page=2';

    test('Not should error exception', async () => {
        const axiosMock = new MockAdapter(axios);
        const expected_status = 200;
        const expected_data: { foo: string } = { foo: 'bar' };

        axiosMock.onGet(URL).reply(expected_status, expected_data);

        const httpClient: Communication = ioc_container.get<HttpClient>(IOC_TYPES.Communication);
        const response = await httpClient.get<{foo: string}>(URL);

        expect(response).toEqual(expected_data);
    });
})
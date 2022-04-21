import "reflect-metadata";
import { ioc_container } from '../../ioc/ioc-container';
import { IOC_TYPES } from '../../ioc/ioc-types';
import createMockStore from "redux-mock-store";
import { AppDispatch, RootState } from "../../redux/store";
import UsersMock from '../../../mocks/Users.mock.json';
import MemoryClient from "../memoryClient";
import User from "../../../modules/users/domain/entities/user.class";

describe('Class: MemoryClient', () => {

    const memoryClient: MemoryClient = ioc_container.get<MemoryClient>(IOC_TYPES.MemoryClient);

    test('[Method: get]: Should return an parameterize reponse', async () => {
        const mockStore = createMockStore<RootState, AppDispatch>();
        const store = mockStore({ users: { users: UsersMock, table_options: null } });
        memoryClient.setStore(store);
        const users = memoryClient.get<User[]>('users','users');

        expect(users).toBeInstanceOf(Array);
    })
})
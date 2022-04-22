import { inject, injectable } from "inversify";
import HttpClient from "../../../../kernel/infrastucture/httpClient.class";
import { Repository } from "../../../../kernel/interfaces/repository.interface";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import { routes } from "../../../../routes/routes";
import { UsersResponseDTO } from "../../domain/interfaces/dtos/users-response-dto.interface";
import User from "../../domain/entities/user.class";
import { store } from "../../../../kernel/redux/store";
import { EnhancedStore } from "@reduxjs/toolkit";
import { MockStoreEnhanced } from "redux-mock-store";
import { user_actions } from "../../application/redux/user.actions";
import MemoryClient from "../../../../kernel/infrastucture/memoryClient";

@injectable()
export default class UserRepository implements Repository<User> {

    private store: EnhancedStore | MockStoreEnhanced = store;

    @inject(IOC_TYPES.HttpClient)
    private readonly httpClient: HttpClient;

    @inject(IOC_TYPES.MemoryClient)
    private readonly memoryClient: MemoryClient;

    async getByPage(pageNumber: number): Promise<User[]> {
        const response = await this.httpClient.get<UsersResponseDTO>(`${routes.get_users_by_page}${pageNumber}`);
        store.dispatch(user_actions.set_table_options(response));
        return response.data;
    }

    getAll(): User[] {
        return this.memoryClient.get<User[]>('users','users');
    }

    getUserSelected(): User {
        return this.memoryClient.get<User>('users','selected');
    }
    
    editUser(user: User): void {
        this.memoryClient.dispatch(user_actions.edit_user(user));
    }

    public setStore(store: MockStoreEnhanced) {
        this.store = store;
    }
}
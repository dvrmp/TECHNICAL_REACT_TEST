import { inject, injectable } from "inversify";
import ReduxLogger from "../../../../kernel/infrastucture/logger.class";
import MemoryClient from "../../../../kernel/infrastucture/memoryClient";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import { store } from "../../../../kernel/redux/store";
import User from "../../domain/entities/user.class";
import { OptionsUsersTable } from "../../domain/interfaces/states/options-users-table.interface";
import UserRepository from "../../infrastucture/repositories/userRepository.class";
import { user_actions } from "../redux/user.actions";

@injectable()
export default class UserService {

    @inject(IOC_TYPES.Repository)
    private readonly userRepository: UserRepository;

    @inject(IOC_TYPES.Logger)
    private readonly reduxLogger: ReduxLogger;

    @inject(IOC_TYPES.MemoryClient)
    private readonly memoryClient: MemoryClient;

    async fetchUsersByPage(pageNumber: number): Promise<void> {
        try {
            store.dispatch(user_actions.fetch_users_request());
            const users = await this.userRepository.getByPage(pageNumber);
            store.dispatch(user_actions.fetch_users_success(users));
        } catch (error) {
            const secureError = error as Error;
            store.dispatch(user_actions.fetch_users_failure(secureError));
            this.reduxLogger.write(secureError.message, 0);
        }        
    }

    getUsers(): User[] {
        return this.userRepository.getAll();
    }

    selectUser(user: User): void {
        store.dispatch(user_actions.select_user(user));
    }

    getSelectedUser(): User {
        return this.userRepository.getUserSelected()
    }

    editUser(user: User): void {
        this.userRepository.editUser(user);
    }

    getTableOptions(): OptionsUsersTable {
        return this.memoryClient.get<OptionsUsersTable>('users','table_options');
    }
}
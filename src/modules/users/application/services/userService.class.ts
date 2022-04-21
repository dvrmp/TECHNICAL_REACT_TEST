import { inject, injectable } from "inversify";
import ReduxLogger from "../../../../kernel/infrastucture/logger.class";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import { store } from "../../../../kernel/redux/store";
import RandomAttribute from "../../domain/models/randomAttribute.class";
import UserRepository from "../../infrastucture/repositories/userRepository.class";
import { user_actions } from "../redux/user.actions";

@injectable()
export default class UserService {

    @inject(IOC_TYPES.Repository)
    private readonly userRepository: UserRepository;

    @inject(IOC_TYPES.Logger)
    private readonly reduxLogger: ReduxLogger;

    async fetchUsersByPage(pageNumber: number): Promise<void> {
        try {
            store.dispatch(user_actions.fetch_users_failure());
            const users = await this.userRepository.getByPage(pageNumber);
            const preparedUsers = users.map(user => ({...user, job: RandomAttribute.generateJob(), created_at: RandomAttribute.generateCreatedAt()}));
            store.dispatch(user_actions.fetch_users_success(preparedUsers));
        } catch (error) {
            const secureError = error as Error;
            store.dispatch(user_actions.fetch_users_failure(secureError));
            this.reduxLogger.write(secureError.message, 0);
        }        
    }

}
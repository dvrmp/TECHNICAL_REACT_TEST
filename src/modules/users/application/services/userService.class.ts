import { inject, injectable } from "inversify";
import ReduxLogger from "../../../../kernel/infrastucture/logger.class";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import { store } from "../../../../kernel/redux/store";
import UserRepository from "../../infrastucture/repositories/userRepository.class";
import { user_actions } from "../redux/user.actions";

@injectable()
export default class UserService {

    @inject(IOC_TYPES.Repository)
    private readonly userRepository: UserRepository;

    @inject(IOC_TYPES.Logger)
    private readonly reduxLogger: ReduxLogger;

    async fetchUsersByPage(numberPage: number): Promise<void> {
        try {
            store.dispatch(user_actions.fetch_user_request());
            const users = await this.userRepository.getByPage(numberPage);
            store.dispatch(user_actions.fetch_user_success(users));
        } catch (error) {
            const secureError = error as Error;
            store.dispatch(user_actions.fetch_user_failure(secureError));
            this.reduxLogger.write(secureError.message, 0);
        }        
    }

}
import { Container } from 'inversify';
import UserService from '../../modules/users/application/services/userService.class';
import User from '../../modules/users/domain/models/user.class';
import UserRepository from '../../modules/users/infrastucture/repositories/userRepository.class';
import HttpClient from '../infrastucture/httpClient.class';
import ReduxLogger from '../infrastucture/logger.class';
import { Communication } from '../interfaces/communication.interface';
import { Logger } from '../interfaces/logger.interface';
import { Repository } from '../interfaces/repository.interface';
import { IOC_TYPES } from './ioc-types';

const ioc_container = new Container();
ioc_container.bind<Communication>(IOC_TYPES.Communication).to(HttpClient);

ioc_container.bind<Repository<User>>(IOC_TYPES.Repository).to(UserRepository);
ioc_container.bind<UserService>(IOC_TYPES.UserService).to(UserService);

ioc_container.bind<Logger>(IOC_TYPES.Logger).to(ReduxLogger).inSingletonScope();

export { ioc_container };

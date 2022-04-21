import { Container } from 'inversify';
import HttpClient from '../infrastucture/httpClient.class';
import ReduxLogger from '../infrastucture/logger.class';
import { Communication } from '../interfaces/communication.interface';
import { Logger } from '../interfaces/logger.interface';
import { IOC_TYPES } from './ioc-types';

const ioc_container = new Container();
ioc_container.bind<Communication>(IOC_TYPES.Communication).to(HttpClient);
ioc_container.bind<Logger>(IOC_TYPES.Logger).to(ReduxLogger).inSingletonScope();

export { ioc_container };
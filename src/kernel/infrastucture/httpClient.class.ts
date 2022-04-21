import axios, { AxiosStatic } from 'axios';
import { inject, injectable } from "inversify";
import { Communication } from "../interfaces/communication.interface";
import { IOC_TYPES } from "../ioc/ioc-types";
import ReduxLogger from "./logger.class";

@injectable()
export default class HttpClient implements Communication {

    private readonly axiosClient: AxiosStatic = axios;

    @inject(IOC_TYPES.Logger)
    private readonly logger: ReduxLogger;

    async get<Response>(path: string): Promise<Response> {
        try {
            const response = await this.axiosClient.get(path);
            return response.data as Response;
        } catch (error) {
            const secureError = error as Error;
            this.logger.write(secureError.message, 0);
            throw secureError;
        }
    }

}
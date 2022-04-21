import { injectable } from "inversify";
import { Logger } from "../interfaces/logger.interface";

@injectable()
export default class ReduxLogger implements Logger {

    write(message: string, level: number) {
        console.log('WRITE MESSAGE ON LOGS REDUCER', message, level);
    }

}
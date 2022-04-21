import { inject, injectable } from "inversify";
import HttpClient from "../../../../kernel/infrastucture/httpClient.class";
import { Repository } from "../../../../kernel/interfaces/repository.interface";
import { IOC_TYPES } from "../../../../kernel/ioc/ioc-types";
import { routes } from "../../../../routes/routes";
import { UsersResponseDTO } from "../../domain/interfaces/dtos/users-response-dto.interface";
import User from "../../domain/models/user.class";

@injectable()
export default class UserRepository implements Repository<User> {

    @inject(IOC_TYPES.Communication)
    private readonly httpClient: HttpClient;

    async getByPage(pageNumber: number): Promise<User[]> {
        const response = await this.httpClient.get<UsersResponseDTO>(`${routes.get_users_by_page}${pageNumber}`);
        return response.data;
    }
}
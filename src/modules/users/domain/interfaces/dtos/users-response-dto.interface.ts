import User from "../../entities/user.class";

export interface UsersResponseDTO {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}
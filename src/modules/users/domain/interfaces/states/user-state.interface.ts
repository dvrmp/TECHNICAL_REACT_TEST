import User from "../../entities/user.class";
import { OptionsUsersTable } from "./options-users-table.interface";

export interface UsersState {
    users: User[];
    table_options: OptionsUsersTable,
    selected: User
}
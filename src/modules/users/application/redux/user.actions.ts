import { createAction } from "@reduxjs/toolkit";
import User from "../../domain/entities/user.class";
import { UsersResponseDTO } from "../../domain/interfaces/dtos/users-response-dto.interface";

const MODULE: string = '@USERS/';

const fetch_users_request = createAction<void>(`${MODULE}REQUEST USERS`)
const fetch_users_success = createAction<User[]>(`${MODULE}REQUEST USERS SUCCESS`);
const fetch_users_failure = createAction<Error> (`${MODULE}REQUEST USERS FAIULURE`);

const set_table_options = createAction<UsersResponseDTO>(`${MODULE}SET OPTIONS TABLE USERS`);

export const user_actions = {
    fetch_users_request,
    fetch_users_success,
    fetch_users_failure,
    set_table_options
}
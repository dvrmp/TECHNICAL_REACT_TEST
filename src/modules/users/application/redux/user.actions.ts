import { createAction } from "@reduxjs/toolkit";
import User from "../../domain/entities/user.class";

const MODULE: string = '@USERS/';

const fetch_users_request = createAction<void>(`${MODULE}REQUEST USERS`)
const fetch_users_success = createAction<User[]>(`${MODULE}REQUEST USERS SUCCESS`);
const fetch_users_failure = createAction<Error> (`${MODULE}REQUEST USERS FAIULURE`);

export const user_actions = {
    fetch_users_request,
    fetch_users_success,
    fetch_users_failure
}
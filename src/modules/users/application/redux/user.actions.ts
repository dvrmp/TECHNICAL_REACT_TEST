import { createAction } from "@reduxjs/toolkit";
import User from "../../domain/models/user.class";

const MODULE: string = '@USERS/';

const fetch_user_request = createAction<void>(`${MODULE}REQUEST USERS`)
const fetch_user_success = createAction<User[]>(`${MODULE}REQUEST USERS SUCCESS`);
const fetch_user_failure = createAction<Error> (`${MODULE}REQUEST USERS FAIULURE`);

export const user_actions = {
    fetch_user_request,
    fetch_user_success,
    fetch_user_failure
}
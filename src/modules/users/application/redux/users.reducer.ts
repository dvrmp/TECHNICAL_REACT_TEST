import { createReducer } from "@reduxjs/toolkit";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";
import { UsersState } from "../../domain/interfaces/states/user-state.interface";
import { user_actions } from "./user.actions";

export const users_initial_state: UsersState = {
    users: []
}

export const usersReducer: ReducerWithInitialState<UsersState> = createReducer(users_initial_state, (builder) => {
    builder.addCase(user_actions.fetch_users_success, (state, action) => {
        state.users = [...state.users, ...action.payload];
    });
});
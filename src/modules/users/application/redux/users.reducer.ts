import { createReducer } from "@reduxjs/toolkit";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";
import { UsersState } from "../../domain/interfaces/states/user-state.interface";
import RandomAttribute from "../../domain/models/randomAttribute.class";
import { user_actions } from "./user.actions";

export const users_initial_state: UsersState = {
    users: [],
    table_options: null
}

export const usersReducer: ReducerWithInitialState<UsersState> = createReducer(users_initial_state, (builder) => {
    builder.addCase(user_actions.fetch_users_success, (state, action) => {
        state.users = action.payload.map(user => {
            return {
                ...user,
                job: user.job || RandomAttribute.generateJob(),
                created_at: user.created_at || RandomAttribute.generateCreatedAt()
            };
        });
    });
    builder.addCase(user_actions.set_table_options, (state, action) => {
        state.table_options = {
            page: action.payload.page,
            per_page: action.payload.per_page,
            total_pages: action.payload.total_pages,
            total: action.payload.total
        }
    })
});
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";





export const selectUserState = createFeatureSelector<UserState>('user')

export const selectUser = createSelector(

    selectUserState,
    (state)=> state.user
)


export const selectToken = createSelector(
    selectUserState,
    (state)=>state.token
)


export const selectUserLoading  = createSelector(
    selectUserState,
    (state)=>state.loading
)


export const selectUserError   = createSelector(
    selectUserState,
    (state)=>state.error
)
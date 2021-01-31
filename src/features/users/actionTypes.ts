import { User } from "../../components/Users/Users";

export const GET_USERS = 'GET_USERS';
export const GET_NEXT_BATCH = 'GET_NEXT_BATCH';
export type PromiseActions = 'PENDING' | 'FULFILLED' | 'REJECTED';

export interface SetUsersAction {
    type: `${typeof GET_USERS}_${PromiseActions}`;
    payload: {
        data: {
            results: User[];
            info: {
                page: number;
            };
        };
    };
};

export interface SetUsersNextBatchAction {
    type: `${typeof GET_NEXT_BATCH}_${PromiseActions}`;
    payload: {
        data: {
            results: User[];
            info: {
                page: number;
            };
        };
    };
};
    
export type USERS_ACTION_TYPE = SetUsersAction | SetUsersNextBatchAction;

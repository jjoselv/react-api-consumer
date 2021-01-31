import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '../../config';
import {buildUsersParams} from '../../features/users/utils';

axiosRetry(axios);

export type AxiosParams = Record<string, string>

export const getUsersApi = (
    params: object,
    {retry = false}: {retry?: boolean} = {retry: false}
) => {
    return axios.get(config.randomUserAPI, {
        params: buildUsersParams(config.randomUserAPI, params),
        'axios-retry': {
            retries: retry ? 3 : 0
        },
    });
};

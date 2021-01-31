import config from '../../config';
import { AxiosParams } from '../../core/api/api';

export const buildUsersParams = (baseUrl: string, options = {}) =>
  getParams(baseUrl, {
    ...options,
    results: `${config.batchSize}`,
    seed: config.seed,
  });

const getParams = (url: string, params: AxiosParams = {}) => {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);
  Object.entries(params).forEach(paramPair =>
    searchParams.append(paramPair[0], paramPair[1])
  );
  return searchParams;
};

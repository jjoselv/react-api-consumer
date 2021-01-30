import config from '../../config';

export const buildUsersParams = (baseUrl, options = {}) =>
  getParams(baseUrl, {
    ...options,
    results: config.batchSize,
    seed: config.seed,
  });

const getParams = (url, params = {}) => {
  const urlObject = new URL(url);
  const searchParams = new URLSearchParams(urlObject.search);
  Object.entries(params).forEach(paramPair =>
    searchParams.append(paramPair[0], paramPair[1])
  );
  return searchParams;
};

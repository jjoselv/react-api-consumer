// test-utils.js
import * as React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

// eslint-disable-next-line react/prop-types
const AllTheProviders = (props: any) => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const settingsState = {
    nationality: 'ch',
  };
  const usersState = {
    users: [
      {
        gender: 'female',
        name: {
          title: 'Madame',
          first: 'Amelie',
          last: 'Guillaume',
        },
        location: {
          street: {
            number: 9309,
            name: 'Rue Louis-Garrand',
          },
          city: 'Islisberg',
          state: 'St. Gallen',
          country: 'Switzerland',
          postcode: 3773,
          coordinates: {
            latitude: '36.5687',
            longitude: '60.2412',
          },
          timezone: {
            offset: '-2:00',
            description: 'Mid-Atlantic',
          },
        },
        email: 'amelie.guillaume@example.com',
        login: {
          uuid: '0656ee6b-1ea1-4d17-95d3-272b4e4f6967',
          username: 'browncat528',
          password: 'stubby',
          salt: '4Mf2fDfu',
          md5: '0de480d777a30ad802a86304cd7a714e',
          sha1: '63bc4ede5665a4b9ef7c70fcd320febc9f8040a4',
          sha256:
            '1777669a7e40e3cccef00e99918e79f24423a1d208d070a6794e46e17530d68c',
        },
        dob: {
          date: '1952-10-15T01:40:43.399Z',
          age: 68,
        },
        registered: {
          date: '2014-07-25T09:43:22.907Z',
          age: 6,
        },
        phone: '079 453 45 13',
        cell: '077 475 92 88',
        id: {
          name: 'AVS',
          value: '756.3333.0872.72',
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/women/25.jpg',
          medium: 'https://randomuser.me/api/portraits/med/women/25.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/women/25.jpg',
        },
        nat: 'CH',
      },
      {
        gender: 'male',
        name: {
          title: 'Monsieur',
          first: 'Ben',
          last: 'Bernard',
        },
        location: {
          street: {
            number: 9429,
            name: 'Rue du 8 Mai 1945',
          },
          city: 'Kilchberg (Zh)',
          state: 'Neuchâtel',
          country: 'Switzerland',
          postcode: 8566,
          coordinates: {
            latitude: '17.1116',
            longitude: '-120.1083',
          },
          timezone: {
            offset: '+1:00',
            description: 'Brussels, Copenhagen, Madrid, Paris',
          },
        },
        email: 'ben.bernard@example.com',
        login: {
          uuid: '577c9e4d-c555-461d-b4c4-61107fc77ed1',
          username: 'smallostrich950',
          password: '2525',
          salt: 'Zg2PFa5p',
          md5: '54cda2dd866bcf2fcd1345a10e26a963',
          sha1: '895cf77c3124e294ba1b4b399738dff526fe4a47',
          sha256:
            '3109981a21e4201d282581ab71a36f354c3c987e063355edb41b882860138f62',
        },
        dob: {
          date: '1991-10-13T11:14:50.703Z',
          age: 29,
        },
        registered: {
          date: '2017-01-19T13:55:13.845Z',
          age: 3,
        },
        phone: '076 338 72 81',
        cell: '078 061 14 62',
        id: {
          name: 'AVS',
          value: '756.9838.4765.32',
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/men/34.jpg',
          medium: 'https://randomuser.me/api/portraits/med/men/34.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/men/34.jpg',
        },
        nat: 'CH',
      },
    ],
    isLoading: false,
    hasError: false,
    isFulfilled: true,
    page: 2,
  };

  const store = mockStore({
    settings: settingsState,
    users: usersState,
  });

  return <Provider store={store} {...props}/>
};

const customRender = (ui: any, options?: any) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};

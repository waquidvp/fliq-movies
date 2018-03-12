import {
  recommend as recommendApi,
  getPreferences as getPreferencesApi,
} from '../../api/recommend';

const recommendStart = () => ({
  type: 'RECOMMEND_START',
});

const recommendSuccess = response => ({
  type: 'RECOMMEND_SUCCESS',
  recommendations: response.recommendations,
});

const recommendFailed = response => ({
  type: 'RECOMMEND_FAILED',
  error: response.message,
});

export const recommend = () => (dispatch, getState) => {
  dispatch(recommendStart());

  const { auth } = getState();

  recommendApi(auth.user.id, auth.user.token)
    .then((response) => {
      console.log(response);
      dispatch(recommendSuccess(response));
    })
    .catch(error => dispatch(recommendFailed(error)));
};

const getPreferencesStart = () => ({
  type: 'GET_PREFERENCES_START',
});

const getPreferencesSuccess = response => ({
  type: 'GET_PREFERENCES_SUCCESS',
  preferences: response.preferences,
});

const getPreferencesFailed = response => ({
  type: 'GET_PREFERENCES_FAILED',
  error: response.message,
});

export const getPreferences = () => (dispatch, getState) => {
  dispatch(getPreferencesStart());

  const { auth } = getState();

  getPreferencesApi(auth.user.id, auth.user.token)
    .then((response) => {
      dispatch(getPreferencesSuccess(response));
    })
    .catch(error => dispatch(getPreferencesFailed(error)));
};

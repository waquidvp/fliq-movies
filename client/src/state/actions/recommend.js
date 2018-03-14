import * as recommendApi from '../../api/recommend';

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

  recommendApi
    .recommend(auth.user.id, auth.user.token)
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

  recommendApi
    .getPreferences(auth.user.id, auth.user.token)
    .then((response) => {
      dispatch(getPreferencesSuccess(response));
    })
    .catch(error => dispatch(getPreferencesFailed(error)));
};

const setPreferencesStart = () => ({
  type: 'SET_PREFERENCES_START',
});

const setPreferencesSuccess = response => ({
  type: 'SET_PREFERENCES_SUCCESS',
  preferences: response.preferences,
});

const setPreferencesFailed = error => ({
  type: 'SET_PREFERENCES_FAILED',
  error: error.message,
});

export const setPreferences = userPreferences => (dispatch, getState) => {
  dispatch(setPreferencesStart());

  const { auth } = getState();

  recommendApi
    .setPreferences(auth.user.id, userPreferences, auth.user.token)
    .then((response) => {
      dispatch(setPreferencesSuccess(response));
      dispatch(recommend());
    })
    .catch(error => dispatch(setPreferencesFailed(error)));
};

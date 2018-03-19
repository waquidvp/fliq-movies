const recommend = (
  state = {
    recommendLoading: false,
    recommendations: [],
    recommendError: null,
    preferencesLoading: false,
    preferences: {},
    preferencesError: null,
    setPreferencesLoading: false,
    setPreferencesError: null,
  },
  action,
) => {
  switch (action.type) {
    case 'RECOMMEND_START':
      return {
        ...state,
        recommendLoading: true,
      };
    case 'RECOMMEND_SUCCESS':
      return {
        ...state,
        recommendLoading: false,
        recommendations: action.recommendations,
      };
    case 'RECOMMEND_FAILED':
      return {
        ...state,
        recommendLoading: false,
        recommendError: action.error,
      };
    case 'GET_PREFERENCES_START':
      return {
        ...state,
        preferencesLoading: true,
      };
    case 'GET_PREFERENCES_SUCCESS':
      return {
        ...state,
        preferencesLoading: false,
        preferences: action.preferences,
      };
    case 'GET_PREFERENCES_FAILED':
      return {
        ...state,
        preferencesLoading: false,
        preferencesError: action.error,
      };
    case 'SET_PREFERENCES_START':
      return {
        ...state,
        setPreferencesLoading: true,
      };
    case 'SET_PREFERENCES_SUCCESS':
      return {
        ...state,
        setPreferencesLoading: false,
        preferences: action.preferences,
      };
    case 'SET_PREFERENCES_FAILED':
      return {
        ...state,
        setPreferencesLoading: false,
        setPreferencesError: action.error,
      };
    default:
      return state;
  }
};

export default recommend;

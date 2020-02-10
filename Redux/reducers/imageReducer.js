import { POST_IMAGE_SUCCESS, POST_IMAGE_FAILURE, LOADING, NOT_LOADING } from '.././actions/types';

const initialState = {
  loading: false,
  image: '',
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE_SUCCESS:
      return {
        ...state,
        profilePhoto: action.payload,
      };
    case POST_IMAGE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case NOT_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
};

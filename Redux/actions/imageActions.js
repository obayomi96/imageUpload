import { POST_IMAGE_SUCCESS, POST_IMAGE_FAILURE, LOADING, NOT_LOADING } from './types';
import axios from 'axios';

export const uploadImage = (payload) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axios.post('https://image-upload-endpoint', payload);
    if (response.status === 201) {
      const { data } = response.data;
      swal({
        text: 'Image uploaded Successfully',
        icon: 'success',
        button: true,
        timer: 3000,
      });
      return dispatch({
        type: POST_IMAGE_SUCCESS,
        payload: data,
      })
    }
    dispatch({ type: NOT_LOADING });
  } catch (err) {
    const { errors } = err.response.data;
    swal({
      text:  errors[0].message,
      icon: 'error',
      button: true,
      timer: 3000,
    });
    dispatch({ type: NOT_LOADING });
    return dispatch({
      type: POST_IMAGE_FAILURE,
      error: errors,
    });
  }
};

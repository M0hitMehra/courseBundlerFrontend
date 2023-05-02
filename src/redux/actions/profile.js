import { server } from '../store';
import axios from 'axios';

export const updateProfile = (name, email) => async dispatch => {
    try {
        dispatch({ type: 'updateProfileRequest' });
        const { data } = await axios.put(
            `${server}/updateprofile`,
            { email, name },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        dispatch({ type: 'updateProfileSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'updateProfileFail',
            payload: error.response.data.message,
        });
    }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
    try {
        dispatch({ type: 'changePasswordRequest' });
        const { data } = await axios.put(
            `${server}/changepassword`,
            { oldPassword, newPassword },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        dispatch({ type: 'changePasswordSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'changePasswordFail',
            payload: error.response.data.message,
        });
    }
};

export const updatProfilePicture = formdata => async dispatch => {
    try {
        dispatch({ type: 'updateProfilePictureRequest' });
        const { data } = await axios.put(
            `${server}/updateprofilepicture`,
            formdata,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            }
        );

        dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'updateProfilePictureFail',
            payload: error.response.data.message,
        });
    }
};

export const forgetPassword = email => async dispatch => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        dispatch({ type: 'forgetPasswordRequest' });
        const { data } = await axios.post(
            `${server}/forgetpassword`,
            { email },
            config
        );

        dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'forgetPasswordFail',
            payload: error.response.data.message,
        });
    }
};



export const resetPassword = (token,password) => async dispatch => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        dispatch({ type: 'resetPasswordRequest' });
        const { data } = await axios.put(
            `${server}/resetpassword/${token}`,
            { password },
            config
        );

        dispatch({ type: 'resetPasswordSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'resetPasswordFail',
            payload: error.response.data.message,
        });
    }
};



export const addToPlaylist = ( id) => async dispatch => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        dispatch({ type: 'addToPlaylistRequest' });
        const { data } = await axios.post(
            `${server}/addtoplaylist`,{
                id
            },
            config  
        );

        dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'addToPlaylistFail',
            payload: error.response.data.message,
        });
    }
};

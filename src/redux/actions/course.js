import { server } from '../store';
import axios from 'axios';

export const getAllCourses = (category="", keyword="") => async dispatch => {
    try {
        dispatch({ type: 'allCourseRequest' });
        const { data } = await axios.get(
            `${server}/courses?keyword=${keyword}&category=${category}`,
        );

        dispatch({ type: 'allCourseSuccess', payload: data.courses });
    } catch (error) {
        dispatch({
            type: 'allCourseFail',
            payload: error.response.data.message,
        });
    }
};

 


export const removeFromPlaylist = ( id) => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'removeFromPlaylistRequest' });
        const { data } = await axios.delete(
            `${server}/removefromplaylist?id=${id}`,
            config  
        );

        dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'removeFromPlaylistFail',
            payload: error.response.data.message,
        });
    }
};


export const getCourseLectures = (id) => async dispatch => {
    try {
        dispatch({ type: 'getCourseRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(
            `${server}/course/${id}`,
            config
        );

        dispatch({ type: 'getCourseSuccess', payload: data.lectures });
    } catch (error) {
        dispatch({
            type: 'getCourseFail',
            payload: error.response.data.message,
        });
    }
};

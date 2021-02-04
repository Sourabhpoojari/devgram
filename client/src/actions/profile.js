import axios from 'axios';
import {setAlert} from './alert';
import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
} from './types';


// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/profile/me');

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        });
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}
// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({type:CLEAR_PROFILE});
    try {
        const res = await axios.get('/profile');
        dispatch({
            type : GET_PROFILES,
            payload : res.data
        });
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}
// Get profile by id
export const getProfileById = userId => async (dispatch) => {
    try {
        const res = await axios.get(`/profile/user/${userId}`);
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        });
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}
// Get github repos
export const getGithubRepos = username => async (dispatch) => {
    try {
        const res = await axios.get(`/profile/github/${username}`);
        dispatch({
            type : GET_REPOS,
            payload : res.data
        });
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}
// Create or update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) =>{
    try {
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };
        const res = await axios.post('/profile',formData,config);
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        });

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created','success'));
        if (edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}

// Add experience
export const addExperience = (formData,history) => async (dispatch) =>{
    try {
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };
        const res = await axios.put('/profile/experience',formData,config);
        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        });

        dispatch(setAlert('Experience Added!'));
        
        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}

// Add education
export const addEducation = (formData,history) => async (dispatch) =>{
    try {
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };
        const res = await axios.put('/profile/education',formData,config);
        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        });

        dispatch(setAlert('Education Added!'));
        
        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}

// Delete Experience
export const deleteExperience = id => async (dispatch) => {
    try {
        const res = await axios.delete(`/profile/experience/${id}`);

        dispatch({
            type : UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience removed!','success'));
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}

// Delete Education
export const deleteEducation = id => async (dispatch) => {
    try {
        const res = await axios.delete(`/profile/education/${id}`);

        dispatch({
            type : UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education removed!','success'));
    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {
                msg : err.response.statusText,
                status : err.response.status
            }
        });
    }
}

// Delete Account
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
             await axios.delete('/profile');
    
            dispatch({ type : CLEAR_PROFILE});
            dispatch({ type : ACCOUNT_DELETED});
            dispatch(setAlert('Your account has been permanently deleted!'));
        } catch (err) {
            dispatch({
                type : PROFILE_ERROR,
                payload : {
                    msg : err.response.statusText,
                    status : err.response.status
                }
            });
        }
    }
    
}
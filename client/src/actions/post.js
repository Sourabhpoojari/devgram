import axios from 'axios';
import {setAlert} from './alert';
import {
    ADD_COMMENT,
    ADD_POSTS,
    DELETE_POSTS,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    REMOVE_COMMENT,
    UPDATE_LIKES
} from './types';

// get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}

// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/posts/unlike/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}

// Delete posts
export const deletePost = id => async dispatch => {
    try {
         await axios.delete(`/posts/${id}`);
        dispatch({
            type:DELETE_POSTS,
            payload:id
        });
        dispatch(setAlert('Post Removed','success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}

//  Add posts
export const addPost = FormData => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    try {
         const res = await axios.post(`/posts`,FormData,config);
        dispatch({
            type:ADD_POSTS,
            payload:res.data
        });
        dispatch(setAlert('Post Created!','success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}   
// GET post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}

//  Add comments
export const addComment = (postId,FormData) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    try {
         const res = await axios.post(`/posts/comment/${postId}`,FormData,config);
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        });
        dispatch(setAlert('Commet Added!','success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
} 

// Delete comment
export const deleteComment = (postId,commentId) => async dispatch => {
    try {
         await axios.delete(`/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        });
        dispatch(setAlert('Comment Removed','success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
            });
        }
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
}
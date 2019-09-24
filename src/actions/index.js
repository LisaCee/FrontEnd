
import { customAuth } from '../utils/authenticator';
import axios from 'axios';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const login = (creds, redirect) => dispatch => {
  dispatch({ type: LOGIN_START });
  return customAuth()
    .post('https://artist-portfolio-backend.herokuapp.com/api/auth/login/', creds)
    .then(res => {
      console.log(res.data);
      if(res.data.authToken){
        localStorage.setItem('token', res.data.authToken);
        redirect();
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE })
    })
};



export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const register = (creds, redirect) => dispatch => {
  console.log("creds from action log", creds )
  dispatch({ type: REGISTER_START });
 axios
    .post('https://artist-portfolio-backend.herokuapp.com/api/auth/register/', creds)
    .then(res => {
      // if(res.data.authToken){
        // localStorage.setItem('token', res.data.authToken);
console.log("register action",res)
     dispatch({ type: REGISTER_SUCCESS });
        // }
      })
      .catch(err => {
        console.log('ERROR', err);
        dispatch({ type: REGISTER_FAILURE})
      })
      .catch(err => console.log(err.response));
  };






export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const getData = () => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axios
    .get("https://artist-portfolio-backend.herokuapp.com/images")
    .then(res => { 
        console.log("actions log :", res.data)
 dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data});
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_DATA_FAILURE, payload: err });
    });
};

export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const deletePost = (id) => dispatch => {
  
  dispatch({ type: DELETE_POST_START });
  axios
    .delete(`https://artist-portfolio-backend.herokuapp.com/api/iamges/${id}`)
    .then(res => { 
      console.log("actions log :",res.data.id)
      dispatch({ type: DELETE_POST_SUCCESS, payload: res.data.id });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_POST_FAILURE, payload: err });
    });
};

export const UPDATE_POST_START = 'UPDATE_POST_START';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';
export const  update = updatedPost=> dispatch => {
  console.log("actions log from post action",updatedPost);
dispatch({type: UPDATE_POST_START });
axios
.put(`https://artist-portfolio-backend.herokuapp.com/api/images/${updatedPost.id}`, updatedPost)
.then(res => {
  dispatch({type:UPDATE_POST_SUCCESS, payload: res.data});
  return true;
})
.catch(err => console.log(err));
};


export const ADD_POST_START = 'ADD_POST_START';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const addPost = (post) => dispatch => {
  console.log( "action log for creating a post",post);
  dispatch({ type: ADD_POST_START });
  axios
      .post("https://artist-portfolio-backend.herokuapp.com/api/images", post)
      .then(res => { 
        console.log("actions log for adding a post :", res)
        dispatch({ type: ADD_POST_SUCCESS, payload: res.data});
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ADD_POST_FAILURE, payload: err });
      });
  };

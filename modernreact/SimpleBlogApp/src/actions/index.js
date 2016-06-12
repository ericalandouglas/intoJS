
import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const API_KEY = 'sheltereddougie1992';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

const signUrl = (apiPath) => { return `${ROOT_URL + apiPath}?key=${API_KEY}`; };
const POSTS_URL = signUrl('/posts');
const signPostsIdUrl = (id) => { return signUrl(`/posts/${id}`); };

export function fetchPosts () {
  const request = axios.get(POSTS_URL);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost (props) {
  const request = axios.post(POSTS_URL, props);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost (id) {
  const payload = id ? axios.get(signPostsIdUrl(id)) : { data: null }; // reset data if no id

  return {
    type: FETCH_POST,
    payload
  };
}

export function deletePost (id) {
  const request = axios.delete(signPostsIdUrl(id));

  return {
    type: DELETE_POST,
    payload: request
  };
}


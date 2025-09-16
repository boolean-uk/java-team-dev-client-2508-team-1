import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('signup', { email, password }, false);
  return await login(email, password);
}


async function createProfile(userId, 
  first_name, 
  last_name, 
  username, 
  github_username, 
  mobile, 
  bio,  
  role, 
  specialism, 
  cohort, 
  start_date, 
  end_date, 
  photo) {

  cohort = parseInt(cohort)
  photo = JSON.stringify(photo)

  return await post(`profiles`, { userId, 
    first_name, 
    last_name, 
    username, 
    github_username, 
    mobile, 
    bio, 
    role, 
    specialism, 
    cohort, 
    start_date, 
    end_date, 
    photo }
  );
}

async function getPosts() {
  const res = await get('posts');

  return res.data.posts;
}
async function getComments(postId) {
  const res = await get(`posts/${String(postId)}/comments`);
  return res.data.comments;
}


async function getUserById(id) {
  const res = await get(`users/${id}`);
  return res.data.user;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  if (!response.ok) {
    const error = new Error(response.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}


export { login, getPosts, register, createProfile, get, getUserById, getComments, post };



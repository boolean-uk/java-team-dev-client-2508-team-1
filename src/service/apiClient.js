import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('signup', { email, password }, false);
  return await login(email, password);
}
/* eslint-disable camelcase */
async function createProfile(userId, first_name, last_name, username, github_username, mobile, bio, role, specialism, cohort, start_date, end_date, photo) {
  console.log(userId, first_name, last_name, username, github_username, mobile, bio, role, specialism, cohort, start_date, end_date, photo)

  cohort = parseInt(cohort)
  photo = JSON.stringify(photo)

  await post(`profiles`, { userId, first_name, last_name, username, github_username, mobile, bio, role, specialism, cohort, start_date, end_date, photo });
  return await patch(`users/${userId}`, {})
}

async function getPosts() {
  const res = await get('posts');
  return res.data.posts;
}

async function getStudents() {
  // CHANGE ENDPOINT!!! make it dynamic based on cohort of logged in user
  const res = await get('cohorts/1');
  const students = res.data.cohort.profiles.filter((userid) => userid?.role?.name === "ROLE_STUDENT");
  return students;
}

async function getTeachers() {
  // CHANGE ENDPOINT!!! make it dynamic based on cohort of logged in user
  const res = await get('cohorts/1');
  const teachers = res.data.cohort.profiles.filter((userid) => userid?.role?.name === "ROLE_TEACHER");
  return teachers;
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

export { login, getPosts, register, createProfile, getStudents, getTeachers };

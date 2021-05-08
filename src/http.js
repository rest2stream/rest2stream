
async function post(url, {
  data = null, 
  method = 'POST', 
  headers = { 'Content-Type': 'application/json' }, 
  formData = null
} = {}) {

  const params = {};
  if (headers) {
    params.headers = headers;
  }
  if (method) {
    params.method = method;
  }
  if (data) {
    params.body = JSON.stringify(data);
  }
  if (formData) {
    params.body = formData;
  }

  const response = await fetch(url, params);

  return await response.json(); // parses JSON response into native JavaScript objects
}

async function get(url, {
  headers = { 'Content-Type': 'application/json' }
} = {}) {

  const params = {};
  if (headers) {
    params.headers = headers;
  }
  // GET request using fetch with async/await
  const response = await fetch(url, params);
  return await response.json()
}

export default {
  post,
  get,
}
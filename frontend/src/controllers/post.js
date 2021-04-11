import config from "../config";
import { getHeaders } from "./user";

async function create(content) {
  const headers = await getHeaders();
  const response = await fetch(`${config.API_URL}/post`, {
    method: "POST",
    body: JSON.stringify({
      content: content,
    }),
    headers: headers,
  });
  if (response.status == 200) {
    const post = await response.json();
    return post;
  } else {
    const text = await response.text();
    throw new Error(text);
  }
}

async function get(page = 1, limit = 5, byUser = undefined) {
  const headers = await getHeaders();
  const response = await fetch(
    `${config.API_URL}/post?page=${page}&limit=${limit}${
      byUser ? `&userId=${byUser}` : ``
    }`,
    {
      headers: headers,
    }
  );
  if (response.status == 200) {
    const post = await response.json();
    return post;
  } else {
    const text = await response.text();
    throw new Error(text);
  }
}

async function request(id) {
  const headers = await getHeaders();
  const response = await fetch(`${config.API_URL}/request?id=${id}`, {
    headers: headers,
  });
  if (response.status !== 200) {
    const text = await response.text();
    throw new Error(text);
  }
}

export { create, get, request };

export default { create, get, request };

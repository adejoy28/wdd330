const baseURL = "https://api.themoviedb.org/3/";
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODAyZjgxMTk4OTA0ZTE1N2NmZDk2NTcwNWMxMjcyYyIsIm5iZiI6MTc0MTYxMTgyNS4yNzUsInN1YiI6IjY3Y2VlMzMxZDk1ZTQxMWRkMDJhN2I0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nAJy1raaizDJybMAbnEaLOsqZwmk7Lu3mUiy4JDacyE';

// const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  const jsonResponse = await res.json();
  // const
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  #key = API_KEY;
  #BASE_URL = baseURL;
  #options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.#key}`
    }
  }

  async getData(url) {
    const response = await fetch(`${this.#BASE_URL + url}`, this.#options);
    const data = await convertToJson(response);
    return data;
  }

  async fetchApi(url) {
    const response = await fetch(url, this.#options);
    const data = await response.json();
    return data;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }


  // This for the header
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout`, options).then(convertToJson);
  }
}


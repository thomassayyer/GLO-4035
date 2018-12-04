export default class {
  constructor(apiUrl, endpoint, secondEndpoint) {
    this.apiUrl = apiUrl;
    this.endpoint = endpoint;
    this.secondEndpoint = secondEndpoint;
  }

  async get(id, params = []) {
    const url = new URL(`${this.apiUrl}${this.endpoint}${id ? `/${id}` : ''}${this.secondEndpoint ? `${this.secondEndpoint}` : ''}`);
    params.forEach(o => Object.keys(o).forEach(key => url.searchParams.append(key, o[key])));
    const res = await fetch(url);
    if (res.status === 200) return res.json();
    return res;
  }

  async add(resource, id) {
    const res = fetch(`${this.apiUrl}${this.endpoint}/${id || ''}${this.secondEndpoint || ''}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    });
    return res;
  }

  async update(id, resource) {
    const res = await fetch(`${this.apiUrl}${this.endpoint}/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    });
    return res.json();
  }

  async delete(id, secondId) {
    const res = fetch(`${this.apiUrl}${this.endpoint}/${id}${this.secondEndpoint ? `${this.secondEndpoint}/${secondId}` : ''}`, {
      method: 'delete',
    });
    return res;
  }
}

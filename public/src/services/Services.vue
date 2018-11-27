<script>
import Vue from 'vue';
import axios from 'axios';
import {
  notification,
} from 'ant-design-vue'

class REST {
  API_URL='http://localhost:4000/api/v1'
    page_size=20;

    // eslint-disable-next-line
    get token() {
      return localStorage.getItem('Token');
    }

    // eslint-disable-next-line
    get token_title() {
      // return process.env.TOKEN_TITLE;
      return 'x-access-token'
    }

    list({
      resource = null, params = {}, page = 1, page_size = null,
    }) {
      if (resource === null) {
        resource = this.api;
      }
      params.page = page;
      params.page_size = page_size === null ? this.page_size : page_size;
      return axios.get(resource, {
        headers: {
          "x-access-token": `${this.token}`,
        },
        params,
        
      });
    }

    create({ resource = null, params = {}, data = {} }) {
      if (resource === null) {
        resource = this.api;
      }
      return axios({
        method: 'post',
        url: resource,
        data,
        headers: {
          "x-access-token": `${this.token}`,          
        },
        params,
      });
    }

    update({ resource = null, params = {}, data = {} }) {
      if (resource === null) {
        resource = this.api;
      }
      return axios({
        method: 'put',
        url: resource,
        data,
        params,
        headers: {
          "x-access-token": `${this.token}`,          
        },
      });
    }

    delete({ resource = null, params = {} }) {
      if (resource === null) {
        resource = this.api;
      }
      return axios({
        method: 'delete',
        url: resource,
        params,
        headers: {
          "x-access-token": `${this.token}`,          
        },
      });
    }
}

// Authentication
class Authentication {
  API_URL='http://localhost:4000/api/v1'
  // To set the token in localstorage
  setToken(token) {
    localStorage.setItem('Token', token);
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  // To remove the token from localstorage
  removeLocalStorage() {
    localStorage.clear();
  }

  // To check user is authenticated
  // To validate the token
  isAuthenticated(to, from, next) {
    // TODO: Setup a dummy JWT required route
    if (localStorage.getItem('Token')) {
      next();
    } else {
      window.location.href = '/login';
    }
  }

  // To login using username(email) & password
  login(username, password) {
    localStorage.setItem('API_DOMAIN', this.API_URL);
    // Validate creds
    const creds = {
      username,
      password,
    };
    return axios.post(`${this.API_URL}/authentication/login`, creds);
  }

  // To remove the token from server & localstorage
  logout() {
    this.removeLocalStorage();
  }
}


class Api extends REST {
    api = `${this.API_URL}`
}

class Product extends REST {
    api = `${this.API_URL}/product/`
}

class User extends REST {
    api = `${this.API_URL}/user/`
}

// Noty
class Noty {
  // eslint-disable-next-line
  success(message, title='Success') {
    notification.success({
      message: title,
      description: message,
    });
  }

  warning(message, title='Warning') {
    notification.warning({
      message: title,
      description: message,
    });
  }

  error(message, title='Attention Required') {
    notification.error({
      message: title,
      description: message,
    });
  }

  info(message, title='Info') {
    notification.info({
      message: title,
      description: message,
    });
  }
}

export default {
  REST,
  auth: new Authentication(),
  api: new Api(),
  products: new Product(),
  users: new User(),
  noty: new Noty(),
};
</script>

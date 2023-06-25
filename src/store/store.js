import { createStore } from 'vuex';

const customStore = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // Save token in localStorage
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});

export default customStore;

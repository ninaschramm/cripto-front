import { createStore } from 'vuex';

const customStore = createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {},
    isLoggedIn(state) {
      return !!state.token;
    },
});

export default customStore;

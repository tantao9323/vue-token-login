import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './http/api'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' || localStorage.getItem('token'),
    userInfo: {}
  },
  mutations: {
    login(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = '';
    },
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    login({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        api.login(params).then(res => {
          if (res && res.status === 200) {
            localStorage.setItem('token', res.data.token);
            commit('login', res.data.token);
            resolve(res);
          }
        }).catch(err => {
          reject(err);
        })
      })
    },
    logout({
      commit
    }) {
      localStorage.removeItem('token');
      commit('logout');
      router.push({
        path: '/login'
      });
    },
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        api.getuserinfo().then(res => {
          if (res && res.status === 200) {
            commit('getUserInfo', res.data.userInfo);
            resolve(res);
          }
        }).catch(err => {
          reject(err);
        })
      })
    }
  }
})
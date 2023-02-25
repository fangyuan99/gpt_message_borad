import { createStore } from 'vuex'
import { login, getMessageList, addMessage, deleteMessage } from '../api'

export default createStore({
  state: {
    user: null,
    messageList: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setMessageList(state, messageList) {
      state.messageList = messageList
    },
    addMessage(state, message) {
      state.messageList.push(message)
    },
    deleteMessage(state, id) {
      state.messageList = state.messageList.filter(message => message._id !== id)
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await login(username, password)
        const { data } = response
        commit('setUser', data.user)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getMessageList({ commit }) {
      try {
        const response = await getMessageList()
        const { data } = response
        commit('setMessageList', data.messageList)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async addMessage({ commit }, { content, author }) {
      try {
        const response = await addMessage(content, author)
        const { data } = response
        commit('addMessage', data.message)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteMessage({ commit }, id) {
      try {
        const response = await deleteMessage(id)
        const { data } = response
        commit('deleteMessage', id)
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  getters: {
    isLoggedIn: state => state.user !== null
  }
})

import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000
})

// 登录
export const login = (username, password) => {
  return instance.post('/login', { username, password })
}

// 获取留言列表
export const getMessageList = () => {
  return instance.get('/messages')
}

// 添加留言
export const addMessage = (content, author) => {
  return instance.post('/messages', { content, author })
}

// 删除留言
export const deleteMessage = (id) => {
  return instance.delete(`/messages/${id}`)
}

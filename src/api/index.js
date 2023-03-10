import axios from "axios";

// 创建 axios 实例
const instance = axios.create({
  //从环境变量中获取
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
});

// 登录
export const login = (username, password) => {
  return instance.post("/login", { username, password });
};

// 获取留言列表
export const getMessageList = () => {
  return instance.get("/messages");
};

// 添加留言
export const addMessage = (username,content) => {
  return instance.post("/new_message", { username, content });
};

// 删除留言
export const deleteMessage = (_id) => {
  return instance.post("/delete_message",{_id});
};

// 获取README.md
export const getReadme = () => {
  const readme = axios.get(
    "https://ghproxy.com/https://raw.githubusercontent.com/fangyuan99/gpt_message_borad/gpt1.1.0/README.md"
  );
  return readme;
}

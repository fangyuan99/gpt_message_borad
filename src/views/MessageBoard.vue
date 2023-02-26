<template>
  <div class="message-board-container">
    <Welcome :username="username" />
    <el-form ref="messageForm" :rules="rules" :model="messageForm">
      <el-form-item prop="content" label="asdf">
        <el-input
          autosize
          type="textarea"
          :row="4"
          v-model.trim="messageForm.content"
        ></el-input>
        <div class="buttons">
          <el-button type="primary" @click="submitMessage" text
            >发布留言</el-button
          >
          <el-button type="primary" @click="getMessages" text
            >刷新留言</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <div class="message-list">
      <el-card
        v-for="(message, index) in messages"
        :key="message._id"
        class="message-card"
      >
        <div class="message-user">
          {{ message.username ? message.username : "未登录用户" }}
        </div>
        <div class="message-content">{{ message.content }}</div>
        <div class="message-time">
          {{ formatDate(message.created_at * 1000) }}
        </div>
        <div class="message-delete">
          <el-button type="danger" size="small" @click="deleteMessage(index)"
            >删除</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import * as api from "../api";
import Welcome from "./Welcome.vue";
import { useStorage } from "@vueuse/core";

export default {
  name: "MessageBoard",
  components: {
    Welcome,
  },
  setup() {
    const messageForm = ref({ content: "" });
    const rules = ref({
      content: [{ required: true, message: "请输入留言内容", trigger: "blur" }],
    });
    const messages = ref([]);
    const username = computed(() => {
      const user = useStorage("user");
      // if(user?.value!==undefined) {
      //   return JSON.parse(user.value).username;
      // }
      return "游客";
    });

    const getMessages = async () => {
      try {
        const { data } = await api.getMessageList();
        messages.value = data;
      } catch (error) {
        // 获取留言失败后的逻辑
      }
    };

    const submitMessage = async () => {
      const valid = true;
      if (valid) {
        try {
          await api.addMessage(username.value, messageForm.value.content);
          messageForm.value.content = "";
          await getMessages();
        } catch (error) {
          // 发布留言失败后的逻辑
        }
      } else {
        return false;
      }
    };

    const deleteMessage = async (index) => {
      const { _id } = messages.value[index];
      try {
        await api.deleteMessage(_id);
        await getMessages();
      } catch (error) {
        // 删除留言失败后的逻辑
      }
    };

    const refreshMessages = async () => {
      await getMessages();
    };

    const logout = () => {
      localStorage.removeItem("user");
    };

    //时间戳转换为日期
    const formatDate = (time) => {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    };

    onMounted(async () => {
      await getMessages();
      console.log("username", username);
    });

    return {
      messageForm,
      rules,
      messages,
      username,
      getMessages,
      submitMessage,
      deleteMessage,
      refreshMessages,
      logout,
      formatDate,
    };
  },
};
</script>

<style scoped>
.message-board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  max-width: 500px;
  margin: 0 auto;
}
.message-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  width: 100%;
}
.message-card {
  width: 100%;
  margin-bottom: 24px;
}
.message-content {
  font-size: 16px;
  margin-bottom: 8px;
  white-space: pre-wrap;
}
.message-time {
  font-size: 12px;
  margin-bottom: 8px;
  color: #999;
}
.message-delete {
  display: flex;
  justify-content: flex-end;
}
.buttons {
  display: block;
  width: 100%;
}
.el-button {
  max-width: 45%;
  /* 靠右 */
  float: right;
}
.el-form {
  width: 100%;
}
</style>

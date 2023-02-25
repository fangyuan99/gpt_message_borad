<template>
  <div class="message-board-container">
    <Welcome :username="username" />
    <el-form ref="messageForm" :rules="rules" :model="messageForm">
      <el-form-item prop="content">
        <el-input
          autosize
          type="textarea"
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
import * as api from "../api";
import Welcome from "./Welcome.vue";

export default {
  name: "MessageBoard",
  components: {
    Welcome,
  },
  data() {
    return {
      messageForm: {
        content: "",
      },
      rules: {
        content: [
          { required: true, message: "请输入留言内容", trigger: "blur" },
        ],
      },
      messages: [],
      username: "",
    };
  },
  async created() {
    await this.getMessages();
    // 从store中获取用户名
    this.username = this.$store.state?.user?.username || "";
  },
  methods: {
    async getMessages() {
      try {
        const { data } = await api.getMessageList();
        this.messages = data;
      } catch (error) {
        // 获取留言失败后的逻辑
      }
    },
    async submitMessage() {
      this.$refs.messageForm.validate(async (valid) => {
        if (valid) {
          try {
            await api.addMessage(this.username,this.messageForm.content);
            this.messageForm.content = "";
            await this.getMessages();
          } catch (error) {
            // 发布留言失败后的逻辑
          }
        } else {
          return false;
        }
      });
    },
    async deleteMessage(index) {
      const { _id } = this.messages[index];
      try {
        await api.deleteMessage(_id);
        await this.getMessages();
      } catch (error) {
        // 删除留言失败后的逻辑
      }
    },
    async refreshMessages() {
      await this.getMessages();
    },
    async logout() {
      localStorage.removeItem("username");
      this.username = "";
    },
    //时间戳转换为日期
    formatDate(time) {
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
    },
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

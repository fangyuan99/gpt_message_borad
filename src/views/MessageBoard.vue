<template>
    <div class="message-board-container">
      <h1>GPT留言板</h1>
      <el-form ref="messageForm" :rules="rules" :model="messageForm" label-width="80px">
        <el-form-item label="留言内容" prop="content">
          <el-input type="textarea" :rows="4" v-model.trim="messageForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMessage">发布留言</el-button>
        </el-form-item>
      </el-form>
      <div class="message-list">
        <el-card v-for="(message, index) in messages" :key="index" class="message-card">
          <div class="message-content">{{ message.content }}</div>
          <div class="message-time">{{ message.time }}</div>
          <div class="message-delete">
            <el-button type="danger" size="small" @click="deleteMessage(index)">删除</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  import * as api from '../api';
  
  export default {
    name: 'MessageBoard',
    data() {
      return {
        messageForm: {
          content: '',
        },
        rules: {
          content: [
            { required: true, message: '请输入留言内容', trigger: 'blur' },
          ],
        },
        messages: [],
      };
    },
    async created() {
      await this.getMessages();
    },
    methods: {
      async getMessages() {
        try {
          const { data } = await api.getMessages();
          this.messages = data;
        } catch (error) {
          // 获取留言失败后的逻辑
        }
      },
      async submitMessage() {
        this.$refs.messageForm.validate(async valid => {
          if (valid) {
            try {
              await api.addMessage(this.messageForm);
              this.messageForm.content = '';
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
    },
  };
  </script>
  
  <style scoped>
  .message-board-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
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
  </style>
  
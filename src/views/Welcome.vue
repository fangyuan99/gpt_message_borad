<template>
  <div class="welcome-container">
    <span class="welcome-text">{{ username ? username : "游客" }}</span>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  props: {
    username: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.welcome-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  margin-right: 20px;
  color:white
}

.welcome-text {
  font-size: 16px;
  font-weight: bold;
}
</style>

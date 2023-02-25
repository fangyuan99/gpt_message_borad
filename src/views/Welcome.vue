<template>
  <div class="welcome-container">
    <span class="welcome-text">{{ username }}</span>
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
  margin-right: 50px;
  padding: 10px;
}

.welcome-text {
  font-size: 16px;
  font-weight: bold;
}
</style>

<template>
  <div v-html="markdown" class="markdown-body"></div>
</template>
<script>
import { marked } from "marked";
import "github-markdown-css";
export default {
  data() {
    return {
      markdown: "",
    };
  },
  mounted() {
    this.getReadme();
  },
  methods: {
    getReadme() {
      // 发送 HTTP 请求获取 README.md 文件内容
      fetch("/README.md")
        .then((response) => response.text())
        .then((markdown) => {
          // 将 Markdown 转换为 HTML 并更新数据
          this.markdown = marked(markdown);
        });
    },
  },
};
</script>

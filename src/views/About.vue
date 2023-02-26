<template>
  <div v-html="markdown" class="markdown-body"></div>
</template>
<script>
import { marked } from "marked";
import { getReadme } from "../api";
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
    async getReadme() {
      const readme = await (await getReadme()).data;
      this.markdown = marked(readme);
    },
  },
};
</script>

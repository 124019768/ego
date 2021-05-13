<template>
  <div id="div1"></div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    this.editor = new E("#div1");
    this.editor.config.focus = false;
    this.editor.config.onchange = (val) => {
      console.log("change 之后最新的 html", val);
      this.$emit("wangData", val);
    };
    this.editor.config.menus = [
      "bold",
      "head",
      "link",
      "italic",
      "underline",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    this.editor.create();
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
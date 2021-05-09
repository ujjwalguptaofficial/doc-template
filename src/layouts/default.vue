<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css"
    />
    <Menu />
    <nuxt />
  </div>
</template>

<script>
import "../styles/index.scss";
import Menu from "../components/menu.vue";
export default {
  components: { Menu },
  mounted() {
    hljs.highlightAll();
  },
};
</script>
 
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
import { copyToClipboard } from "@/utils";
export default {
  components: { Menu },
  mounted() {
    hljs.highlightAll();
    const copyHtml = `Copy <i class="margin-left-10px far fa-copy"></i>`;
    document.querySelectorAll("pre code").forEach((el) => {
      const div = document.createElement("div");
      div.className = "code-copy ripple";
      div.innerHTML = copyHtml;
      el.parentNode.prepend(div);
      div.onclick = () => {
        const text = el.innerText;
        copyToClipboard(text);
        div.innerHTML = `Copied <i class="margin-left-10px fas fa-check"></i>`;
        setTimeout(() => {
          div.innerHTML = copyHtml;
        }, 1000);
      };
    });
  },
};
</script>
 <style>
.code-copy {
  position: absolute;
  z-index: 1000;
  right: 10px;
  cursor: pointer;
  padding: 5px;
}
</style>
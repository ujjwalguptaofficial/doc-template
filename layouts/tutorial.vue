<template>
  <div class="row b-tutorial">
    <div class="col-sm-4 col-md-4 col-lg-2 b-tutorial__links">
      <a
        class="col b-tutorial__links__item ripple"
        :class="{ 'b-tutorial__links__item--active': index === activeUrlIndex }"
        v-for="(link, index) in links"
        :key="link.text"
        :href="link.url"
      >
        {{ link.text }}
      </a>
    </div>
    <div class="b-tutorial__content col-sm-8 col-md-8 col-lg-10">
      <slot></slot>
      <div class="b-tutorial__content__btns">
        <i @click="goto(-1)" class="fas fa-chevron-left"></i>
        <i @click="goto(1)" class="fas fa-chevron-right"></i>
      </div>
    </div>
    <div class="b-tutorial__sticky-btn">
      <a
        class="btn rounded secondary margin-bottom-70px"
        alt="edit this doc"
        target="_blank"
        href="https://gitter.im/JsStore/Lobby"
      >
        <i class="fab fa-gitter"></i>
      </a>
      <a
        alt="edit this doc"
        target="_blank"
        :href="`https://github.com/ujjwalguptaofficial/jsstore.docs/edit/master/content${currentUrl}.md`"
        class="btn secondary"
        fixed
        bottom
        right
        fab
      >
        <i class="far fa-edit"></i>
      </a>
    </div>
  </div>
</template>
<script  >
import { copyToClipboard } from "@/utils";

export default {
  head() {
    return {
      title: `JsStore - ${this.title}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "keywords",
          name: "keywords",
          content: this.keywords,
        },
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  },
  props: {
    contentSrc: String,
    title: String,
    description: String,
    keywords: String,
  },
  computed: {
    currentUrl() {
      return this.$route.path;
    },
    activeUrlIndex() {
      const splittedPath = this.$route.path.split("/");
      const lastPath = splittedPath[splittedPath.length - 1];
      const result = this.links.findIndex((val) => {
        return val.url === lastPath;
      });
      return result;
    },
  },
  data() {
    return {
      links: [],
    };
  },
  fetch() {
    const links = require("../content/tutorial");
    this.links = links;
  },
  mounted() {
    console.log("meta", this.title);
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
  methods: {
    goto(delta) {
      const splittedPath = this.currentUrl.split("/");
      splittedPath[splittedPath.length - 1] = this.links[
        this.activeUrlIndex + delta
      ].url;
      const path = splittedPath.join("/");
      this.$router.push({
        path,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.b-tutorial {
  padding: 10px 10px 0 10px;
}
.b-tutorial__links {
  padding-right: 30px;
  border-right: 1px solid #e9ecef;
}
.b-tutorial__links__item {
  cursor: pointer;
  padding: 10px;
  color: var(--link-color);
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.b-tutorial__links__item--active {
  /* background: var(--secondary-color); */
  border: 1px solid;
  border-radius: 3px;
  text-align: center;
  color: var(--secondary-color);
}
.b-tutorial__content {
  padding-left: 40px;
}
.b-tutorial__content__btns {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: 20px;
  i {
    cursor: pointer;
  }
}
.b-tutorial__sticky-btn {
  position: fixed;
  right: 0;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  a {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-bottom: 10px;
    padding: 0;
  }
}
</style>
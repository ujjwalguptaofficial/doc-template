<template>
  <div class="row b-tutorial">
    <div class="col-sm-4 col-md-4 col-lg-2 b-tutorial__links">
      <a
        class="col b-tutorial__links__item ripple"
        :class="{ 'b-tutorial__links__item--active': link === activeUrl }"
        v-for="link in links"
        :key="link.text"
        :href="link.url"
      >
        {{ link.text }}
      </a>
    </div>
    <div class="b-tutorial__content col-sm-8 col-md-8 col-lg-10">
      <slot></slot>
      <div class="b-tutorial__content__btns">
        <i class="fas fa-chevron-left"></i>
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>
<script  >
export default {
  // tutorialContent = ``;
  // title = "";
  // keywords = "";
  // description = "";
  props: {
    contentSrc: String,
  },
  computed: {
    currentUrl() {
      return this.$route.path;
    },
    activeUrl() {
      const splittedPath = this.$route.path.split("/");
      const lastPath = splittedPath[splittedPath.length - 1];
      const result = this.links.find((val) => {
        return val.url === lastPath;
      });
      console.log("result", result, lastPath);
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
  // beforeMount(){
  //   this.pathname =
  // }
};
</script>
<style scoped lang="scss">
.b-tutorial {
  padding: 10px 10px 0 10px;
}
.b-tutorial__links {
  padding-right: 20px;
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
.b-tutorial__content__btns {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-top: 20px;
}
</style>
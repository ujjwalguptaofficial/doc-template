<template>
  <div class="b-menu row">
    <template v-if="shouldShowMenuIcon">
      <button
        @click="onMenuBtnClick"
        class="b-menu__hamburger"
        style="color: white; padding-right: 10px"
      >
        <i class="material-icons">menu</i>
      </button>
      <a class="b-menu__icon" href="/" title="JsStore Index Page">
        <img
          src="/img/JsStore_145_64.png"
          alt="JsStore"
          :class="{ 'height-50px': true }"
        />
      </a>
    </template>
    <div v-else></div>
    <div id="b-menu__github-info" class="row content-v-center">
      <div>
        <a
          title="star jsstore"
          href="https://github.com/ujjwalguptaofficial/JsStore"
        >
          <i class="fab fa-github"></i>
          Star
          <span class="star-count" v-if="starCount">{{ starCount }}</span>
        </a>
      </div>
      <div class="ml-10px mr-10px">|</div>
      <div>
        <a
          title="fork on github"
          href="https://github.com/ujjwalguptaofficial/JsStore/fork"
        >
          <svg
            version="1.1"
            width="10"
            height="18"
            style="fill: white; vertical-align: sub"
            viewBox="0 0 10 16"
            class="octicon octicon-repo-forked"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
            />
          </svg>
          Fork
        </a>
      </div>
      <div>
        <select
          class="dropdown"
          id="selectVersions"
          v-model="activeVersion"
          @change="onVersionChange"
        >
          <option :value="i" v-for="i in 3" :key="i">V {{ i }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    shouldShowMenuIcon() {
      return this.$route.path != "/";
    },
  },
  data() {
    return {
      activeVersion: 3,
      starCount: null,
    };
  },
  async mounted() {
    this.activeVersion = this.getVersion();
    try {
      const response = await fetch(
        "//api.github.com/repos/ujjwalguptaofficial/jsstore"
      );
      this.starCount = (await response.json()).stargazers_count;
    } catch (ex) {}
  },
  methods: {
    onMenuBtnClick() {
      this.$emit("menu_click");
    },

    onVersionChange() {
      this.$emit("version_change", this.activeVersion);
    },

    getVersion() {
      const currentUrl = this.$route.path;
      if (currentUrl.indexOf("v1") >= 0 && currentUrl.indexOf("v2") < 0) {
        return 1;
      } else if (
        currentUrl.indexOf("v2") >= 0 &&
        currentUrl.indexOf("v3") < 0
      ) {
        return 2;
      }
      return 3;
    },
  },
};
</script>
<style scoped>
.b-menu {
  justify-content: space-between;
  background: var(--primary-color);
  padding: 14px;
  color: var(--primary-contrast-color);
}

a {
  color: var(--primary-contrast-color);
}

@media (min-width: 768px) {
  .b-menu__hamburger {
    display: none;
  }
}
#selectVersions {
  -webkit-appearance: menulist;
  background-color: white;
  margin-top: -3px;
  margin-left: 5px;
  padding: 3px;
  width: 50px;
}
.height-50px {
  height: 50px;
}
.star-count {
  padding: 5px;
  color: black;
  background: white;
  margin-left: 6px;
  position: relative;
  border-radius: 4px;
}
.star-count:before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  top: 50%;
  border-right-color: #fafafa;
  left: -5px;
  margin-top: -6px;
  border-width: 6px 6px 6px 0;
  /* content: "";
  position: absolute;
  height: 0;
  width: 0;
  right: 100%;
  top: 0;
  border: 20px solid transparent;
  border-right: 20px solid red; */
}
</style>


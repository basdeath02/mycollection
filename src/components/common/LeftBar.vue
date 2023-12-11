<template>
  <!-- LeftBar -->
  <div
    class="bg-blue-500 text-blue-100 w-64 space-y-6 px-1 py-4 absolute inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full transition duration-200 ease-in-out"
    :class="{
      'relative translate-x-0-important': this.$store.state.leftBar.showLeftBar,
    }"
  >
    <div class="flex justify-between">
      <div class="flex-row">
        <router-link
          to="/"
          @click="this.onClickLogo()"
          class="flex items-center space-x-2 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
            />
          </svg>
          <span class="text-2xl font-extrabold text-white">Collection</span>
        </router-link>
      </div>
      <div class="flex-row">
        <HamburgerMenuIcon
          class="text-white"
          id="hamburgerMenuIcon"
          :class="{ hidden: !this.$store.state.leftBar.showLeftBar }"
        />
      </div>
    </div>
    <ul>
      <li v-for="(menu, index) in menuList" :key="menu.name + index">
        <div class="flex-col">
          <router-link
            :to="menu.path"
            @click="this.onClickMenu(menu)"
            class="group flex items-center space-x-2 px-4 py-3 rounded hover:bg-blue-600 hover:text-white transition duration-200"
            :class="{
              'menu-active':
                this.$store.state.leftBar.selectedMenu == menu.path ||
                this.selectedParentMenu == menu.name ||
                this.$store.state.leftBar.selectedParentMenu == menu.name,
            }"
          >
            <div class="flex w-full justify-between">
              <div class="flex">
                <img
                  v-if="menu.meta && menu.meta.image"
                  :src="menu.meta.image"
                  class="w-6 h-6 left-bar-svg-color"
                />
                <span class="ml-2 text-white group-hover:text-white">{{
                  menu.name
                }}</span>
              </div>
              <div class="flex" :class="{ hidden: !menu.isParent }">
                <img
                  :src="this.iconChevronDown"
                  class="w-6 h-6 left-bar-svg-color"
                  :class="{
                    hidden:
                      !menu.isParent ||
                      (menu.isParent && this.selectedParentMenu == menu.name),
                  }"
                />
                <img
                  :src="this.iconChevronUp"
                  class="w-6 h-6 left-bar-svg-color"
                  :class="{
                    hidden:
                      !menu.isParent ||
                      (menu.isParent && this.selectedParentMenu != menu.name),
                  }"
                />
              </div>
            </div>
          </router-link>
          <ul
            :class="{
              hidden:
                this.selectedParentMenu == null ||
                (this.selectedParentMenu != null &&
                  this.selectedParentMenu != menu.name),
            }"
          >
            <li
              v-for="(children, index) in menu.children"
              :key="menu.name + children.name + index"
            >
              <router-link
                :to="children.path"
                @click="this.onClickMenu(children, menu.name, true)"
                class="group flex items-center space-x-2 px-4 py-3 rounded hover:bg-blue-700 hover:text-white transition duration-200"
                :class="{
                  'menu-active':
                    this.$store.state.leftBar.selectedMenu == children.path,
                }"
              >
                <img
                  :src="this.iconPaperAirplane"
                  class="ml-4 mr-2 w-3 h-3 left-bar-svg-color"
                />
                <span class="text-white group-hover:text-white">{{
                  children.name
                }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ignoreShowLeftMenu } from "../../router/router.js";
import HamburgerMenuIcon from "./HamburgerMenuIcon.vue";
import iconChevronDown from "@/assets/images/icon-chevron-down.svg";
import iconChevronUp from "@/assets/images/icon-chevron-up.svg";
import iconPaperAirplane from "@/assets/images/icon-paper-airplane.svg";

export default {
  name: "LeftBar",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const selectedParentMenu = ref(null);
    const menuList = ref([]);

    return {
      route,
      router,
      ignoreShowLeftMenu,
      iconChevronDown,
      iconChevronUp,
      iconPaperAirplane,
      selectedParentMenu,
      menuList,
    };
  },
  async mounted() {
    await this.router.isReady();
    const menuList = this.router.options.routes;
    const pathUrl = this.route.path;
    this.menuList = this.checkIsParent(menuList, pathUrl);
    this.menuList.forEach((menu) => {
      if (menu.path == pathUrl) {
        this.$store.commit("setSelectedMenu", { menuPath: pathUrl });
      } else {
        if (
          menu.children &&
          menu.children.findIndex((child) => child.path == pathUrl) != -1
        ) {
          this.$store.commit("setSelectedMenu", { menuPath: pathUrl });
          this.$store.commit("setSelectedParentMenu", {
            parentName: menu.name,
          });
        } else {
          this.$store.commit("setSelectedMenu", {
            menuPath: sessionStorage.getItem("selectedMenu"),
          });
          if (
            menu.children &&
            menu.children.findIndex(
              (child) => child.path == sessionStorage.getItem("selectedMenu")
            ) != -1
          ) {
            this.$store.commit("setSelectedParentMenu", {
              parentName: menu.name,
            });
          }
        }
      }
    });
  },
  components: { HamburgerMenuIcon },
  methods: {
    onClickLogo() {
      this.$store.commit("setSelectedMenu", { menuPath: "/collection" });
      this.$store.commit("setSelectedParentMenu", { parentName: null });
      this.selectedParentMenu = null;
      this.router.push({ path: "/collection" });
      this.closeLeftBar();
    },
    onClickMenu(menu, menuName = menu.name, isChildren = false) {
      if (isChildren) {
        if (this.$store.state.leftBar.selectedParentMenu == null) {
          this.$store.commit("setSelectedMenu", { menuPath: menu.path });
          this.$store.commit("setSelectedParentMenu", {
            parentName: menuName,
          });
        } else {
          this.$store.commit("setSelectedMenu", { menuPath: menu.path });
          this.$store.commit("setSelectedParentMenu", {
            parentName: menuName,
          });
        }
        this.closeLeftBar();
      } else {
        if (menu.isParent) {
          if (
            this.selectedParentMenu != null &&
            this.selectedParentMenu == menuName
          ) {
            this.selectedParentMenu = null;
          } else {
            this.selectedParentMenu = menuName;
          }
        } else {
          this.$store.commit("setSelectedMenu", { menuPath: menu.path });
          this.$store.commit("setSelectedParentMenu", {
            parentName: null,
          });
          this.selectedParentMenu = null;
          this.closeLeftBar();
        }
      }
    },
    closeLeftBar() {
      if (this.$store.state.leftBar.showLeftBar) {
        this.$store.commit("setShowLeftBar");
      }
    },
    ignorePathForShowLeftMenu(menu) {
      let result = false;
      if (this.ignoreShowLeftMenu.indexOf(menu.name) != -1) {
        result = true;
      }
      return result;
    },
    checkIsParent(menuList, pathUrl) {
      menuList.forEach((menu, index) => {
        if (this.ignorePathForShowLeftMenu(menu)) {
          menuList.splice(index, 1);
          this.checkIsParent(menuList, pathUrl);
        } else {
          if (menu?.children && menu.children.length > 0) {
            menuList[index].isParent = true;
            menu.children.forEach((children, childrenIndex) => {
              if (this.ignorePathForShowLeftMenu(children)) {
                menu.children.splice(childrenIndex, 1);
                this.checkIsParent(menuList, pathUrl);
              } else {
                if (pathUrl == children.path) {
                  this.$store.commit("setSelectedParentMenu", {
                    parentName: menu.name,
                  });
                  this.selectedParentMenu = menu.name;
                }
              }
            });
          } else {
            menuList[index].isParent = false;
          }
        }
      });
      return menuList;
    },
  },
};
</script>

<style>
.translate-x-0-important {
  --tw-translate-x: -0px !important;
}
#hamburgerMenuIcon {
  display: none;
}
.left-bar-svg-color {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%)
    contrast(103%);
}
.group:hover .left-bar-svg-color {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%)
    contrast(103%);
}
.menu-active {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
@media only screen and (max-width: 767px) {
  #hamburgerMenuIcon {
    display: block;
  }
}
</style>
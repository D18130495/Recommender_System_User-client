<template>
  <div class="arrow-down">
    123
  </div>
</template>

<script>
import throttle from "throttle-debounce/throttle";

export default {
  data() {
    return {
      recommendItem: null,
    };
  },
  mounted() {
    this.throttledScrollHandler = throttle(100, this.handleScroll);
    window.addEventListener("scroll", this.throttledScrollHandler);
  },
  computed: {
   backImage() {
     return this.hasTitle ? this.$store.state.image : (this.recommendItem === null ? this.$store.state.image : `url(${this.recommendItem.value.split("-doubj-")[2]}) no-repeat`);
   },
   hasTitle() {
     return (
       this.$store.state.title !== undefined && this.$store.state.title !== ""
     );
   }
  },
  methods: {
    handleScroll() {
      const scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.$store.commit("setScroll", scroll);
    },
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 45px;
  transition: all 0.4s ease 0s;
}
.header .nv-button{
  height: 100%;
}
.header-higher{
  height: 60px;
}
.fix {
  position: fixed;
  z-index: 10000;
}
.navbar {
  height: 100%;
  width: 80%;
  margin: 0 auto;
}
.logo {
  font-size: 24px;
  padding: 0 10px;
}
.back-img {
  background-size: 100% 100% !important;
  width: 100%;
  height: 100vh;
  transition: background .4s ease-in-out 0s;
}
.arrow-down {
  /*color: white;*/
  color: greenyellow;
  position: absolute;
  left: 50%;
  bottom: 80px;
  cursor: pointer;
  animation: MoveDown 2s infinite;
}
@keyframes MoveDown {
  0% {
    bottom: 80px;
  }
  50% {
    bottom: 70px;
  }
  100% {
    bottom: 80px;
  }
}
.title {
  background: rgba(45, 52, 54, 0.4);
  color: white;
  font-size: 42px;
  font-weight: 1000;
  font-family: "宋体";
}
.recommend-container {
  position: absolute;
  bottom: 5vh;
  height: 10vh;
  display: flex;
}
.recommend-container>img {
  width: 8em;
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s ease 0s;
}
.recommend-container>img:hover {
  transform: scale(1.5);
}
</style>

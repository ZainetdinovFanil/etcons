
<template>
  <div class="container">
    <nav>
      <ul>
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const routes = router.getRoutes();
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.container{
  width: 100%;
}
</style>

<template>
  <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Menu",
  computes: mapState(['isMenuVisible'])
};
</script>

<style scoped>
.menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>

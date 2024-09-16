<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <inputForm msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import inputForm from "../components/inputForm.vue";

@Options({
  components: {
    inputForm,
  },
})
export default class HomeView extends Vue {}
</script>

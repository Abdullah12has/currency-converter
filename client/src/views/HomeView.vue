<template>
  <inputForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import inputForm from "../components/inputForm.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    inputForm,
  },
});
</script>

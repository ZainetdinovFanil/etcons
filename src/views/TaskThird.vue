<template>
    <BaseSelect
      :items="items"
      optionLabel="name"
      placeholder="Select Items"
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import BaseSelect from "../components/base/BaseSelect.vue";
  
  interface Item {
    name: string;
    code: string;
  }
  
  const items = ref<Item[]>([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]);
  </script>
  
<template>
    <div class="card flex justify-content-center">
      <div class="relative">
        <MultiSelect
          v-model="selectedItems"
          :options="items"
          :optionLabel="optionLabel"
          :placeholder="placeholder"
          :maxSelectedLabels="3"
          class="w-full md:w-20rem"
        />
        <i
          v-if="selectedItems && selectedItems.length > 0"
          class="pi pi-times absolute right-0 top-0 mt-2 mr-2 cursor-pointer"
          @click="clearSelection"
        ></i>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from "vue";
  
  
  const props = defineProps<{
    items: any[];
    optionLabel: string;
    placeholder: string;
  }>();
  
  const selectedItems = ref<any[]>([]);
  
  const clearSelection = () => {
    selectedItems.value = [];
  };
  </script>
  
  <style scoped>
  .relative {
    position: relative;
  }
  .absolute {
    position: absolute;
    right: 38px;
    top: 17px;
  }
  .pi-times {
    cursor: pointer;
    color: #6b7280;
    font-size: 1rem;
  }
  </style>
  
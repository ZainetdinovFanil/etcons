<template>
    <div class="datepicker">
      <div class="datepicker-block">
        <p>Значение переменной директивы v-model: {{ dataTime }}</p>
        <Calendar class="datepicker-input"
          v-model="time"
          timeOnly
          showIcon
          :showOnFocus="false"
        >
        </Calendar>
      </div>
      <div class="datepicker-btns">
        <Button label="Сегодня" text class="custom-button" @click="todayDate"/>
        <Button label="Очистить" text class="custom-button" @click="clearDate"/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import Calendar from "primevue/calendar";
  import Button from "primevue/button";
  
  const time = ref<Date | null>();
  
  const dataTime = computed(() => {
    if (time.value) {
      const date : Date = new Date(time.value);
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else {
      return "";
    }
  });
  
  const todayDate = () => {
    const date : Date = new Date();
    time.value = date;
  };
  
  const clearDate = () => {
    time.value = null;
  };
  </script>
  
  <style scoped>
  .datepicker-block {
    width: 500px;
    margin-bottom: 130px;
  }
  
  .datepicker-btns {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  
  .datepicker-input {
    width: 100%;
  }
  
  .custom-button:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  </style>
  
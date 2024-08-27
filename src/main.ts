// src/main.ts
import { createApp } from 'vue';
import './style.css';
import './assets/theme.scss';
import App from './App.vue';
import router from './router/index.ts';
import PrimeVue from 'primevue/config';

import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import 'primevue/resources/themes/lara-light-indigo/theme.css'; // Выберите тему по вашему вкусу
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import axios from './axios';

const app = createApp(App);

// Добавление глобальных свойств
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('Toast', Toast);
app.component('Calendar', Calendar);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('MultiSelect', MultiSelect);

// Монтирование приложения
app.mount('#app');

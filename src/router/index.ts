import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TaskSecond from '../views/TaskSecond.vue';
import TaskFirst from '../views/TaskFirst.vue';
import TaskThird from '../views/TaskThird.vue';
import TaskFourth from '../views/TaskFourth.vue';
import TaskFifth from '../views/TaskFifth.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/taskFirst',
    name: 'taskFirst',
    component: TaskFirst,
    meta: { title: 'TaskFirst Page' }
  },
  {
    path: '/taskSecond',
    name: 'taskSecond',
    component: TaskSecond,
    meta: { title: 'TaskSecond Page' }
  },
  {
    path: '/taskThird',
    name: 'taskThird',
    component: TaskThird,
    meta: { title: 'TaskThird Page' }
  },
  {
    path: '/taskFourth',
    name: 'taskFourth',
    component: TaskFourth,
    meta: { title: 'TaskFourth Page' }
  },
  {
    path: '/taskFifth',
    name: 'taskFifth',
    component: TaskFifth,
    meta: { title: 'TaskFifth Page' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Глобальный навигационный хук для обновления заголовка страницы
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;

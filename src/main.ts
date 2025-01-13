import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import route from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

createApp(App).use(router).mount('#app')

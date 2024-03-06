import './assets/style.scss';

import { createApp } from 'vue';
// import { createPinia } from 'pinia';

import App from './App.vue';
// import router from './router';

import { defineRule } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';

import BaseLoader from './components/base/BaseLoader.vue';
import BaseToast from './components/base/BaseToast.vue';

const app = createApp(App);

Object.entries(AllRules).forEach((arr: any) => {
  defineRule(arr[0], arr[1]);
});

app.component('BaseLoader', BaseLoader);
app.component('BaseToast', BaseToast);

// app.use(createPinia());
// app.use(router);

app.mount('#app');

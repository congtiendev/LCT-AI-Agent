// src/main.ts
import { createApp, nextTick } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import { pinia } from './stores';
import router from './router';
import './styles/style.css';
import './styles/custom.scss';
import i18n from './i18n';
import { configureAxiosInterceptors } from '@/configs/axiosConfig';
import Vue3LazyLoad from 'vue3-lazyload';

const app = createApp(App);
const head = createHead();

// Lấy hàm t từ i18n toàn cục
const { t } = i18n.global;

// Cấu hình axios interceptors với hàm dịch
configureAxiosInterceptors(t);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(head);
app.use(Vue3LazyLoad, {
  loading: '/images/loading.gif',
  error: 'images/placeholders/no-image.jpg',
  preLoad: 1.3,
  attempt: 3,
  observerOptions: { rootMargin: '0px 0px 200px 0px' },
});
app.mount('#app');

// Re-init KTUI components
function reinitKTUI() {
  Object.keys(window)
    .filter(
      (k) =>
        k.startsWith('KT') && typeof (window as any)[k]?.init === 'function'
    )
    .forEach((k) => {
      try {
        (window as any)[k].init();
      } catch (e) {
        console.warn(`KTUI init ${k} error`, e);
      }
    });
}

// Reload vendor scripts
function reloadScripts(paths: string[]) {
  paths.forEach((path) => {
    const old = document.querySelector(`script[src$="${path}"]`);
    if (old) {
      const s = document.createElement('script');
      s.src = old.getAttribute('src')!;
      document.body.appendChild(s);
    }
  });
}

router.afterEach(() => {
  nextTick(() => {
    reinitKTUI(); // KTUI (core.bundle.js + ktui.min.js)
    reloadScripts([
      '/assets/js/widgets/general.js',
      '/assets/js/layouts/demo1.js',
    ]);
  });
});

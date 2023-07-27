import "./public-path.js";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";


let router = null;
let instance = null;
let history = null;

function render(props = {}) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/');
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 作为子应用运行时 -> 暴露 qiankun 协议
export async function bootstrap() {
  console.log("[vue3] vue3 app bootstraped");
}
export async function mount(props) {
  console.log("[vue3] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}

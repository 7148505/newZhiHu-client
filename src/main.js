import app from './common';
import router from './router';
import store from './store';
// import antd from 'ant-design-vue'
// import 'ant-design-vue/components/style.js'
// import '@assets/font/DingDing/iconfont.css'
import '@assets/font/iconfont.css';
// app.use(antd)
app.use(store);
app.use(router);
app.mount('#app');

// app.config.globalProperties.$router = router

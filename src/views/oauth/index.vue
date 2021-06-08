<template>
  <div class="oauth">
    <a-spin tip="授权中,请稍后.">
      <!-- <div class="spin-content"></div> -->
    </a-spin>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, onUnmounted, watch, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getGitHubUserInfo } from '@/api/oauth.js';
import { getToken, setToken } from '@/libs/util';

export default {
  name: '',
  components: {},
  setup (props, ctx) {
    const state = reactive({});
    const route = useRoute();
    const router = useRouter();
    console.log('route', route);
    console.log('router', router);
    console.log('code', route.query.code);

    onMounted(() => {
      getGitHubUserInfo({
        client_id: '05836262c1c99fc6f393',
        client_secret: '56c0601c0b20edbf954ed79e8b90a3030cd6aa7d',
        code: route.query.code
      })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            console.log(res);
            setToken(res.token);
            console.log('parent,0', window.opener);
            window.closeOauth();
            // if (from.query.redirectPath) {
            //   next({
            //     path: from.query.redirectPath
            //   });
            // } else {
            //   next({ name: homeName });
            // }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
<style lang="less" scoped>
//
.oauth {
  height: 100%;
  width: 100%;
  position: relative;
  ::v-deep(.ant-spin-spinning) {
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  ::v-deep(.ant-spin-nested-loading) {
    height: 100%;
    .ant-spin {
      height: 100%;
      max-height: 100%;
    }
  }
}
</style>

<template>
  <div>
    <div class="sectionHeader sectionHeader__material">
      <h2 class="header">Ответ</h2>
    </div>
    <div class="cellContainer cellContainer__material separator">
      <Loader v-if="loading"></Loader>
      <div v-if="data && !loading" @click="copyToClipboard" class="response">
        <div v-if="data.error" class="error">
          Возникла ошибка: {{data.error}}
        </div>
        <div v-if="data.success" class="error">
          {{data.success}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "../Loader/Loader.vue";
import Echo from "laravel-echo";
import io from "socket.io-client";
export default {
  components: {Loader},
  data() {
    return {
      data: null,
      loading: false,
    };
  },
  mounted() {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://localhost:6001',
      client: io,
    });

    let tg_id = this.TWA.initDataUnsafe?.user?.id || 782919745;

    echo.channel("laravel_database_gpt_response_"+tg_id).listen("GptResponse", (response) => {
      this.data = response.data;
      this.toggleLoading();
    });
  },
  methods: {
    toggleLoading(){
      this.loading = !this.loading;
    },
    copyToClipboard() {
      const el = document.createElement('textarea');
      el.value = this.data?.success;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
  }

};
</script>

<style scoped lang="scss">
@import '../../index.module';
@import "FullResponse.module.scss";
.response{
  white-space: pre-line;
  line-height: normal;
}

</style>
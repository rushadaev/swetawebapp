<template>
  <div>
    <div class="sectionHeader sectionHeader__material">
      <h2 class="header">Ответ</h2>
    </div>
    <div class="cellContainer cellContainer__material separator">
      <div @click="copyToClipboard" class="response">
        {{message}}
      </div>
    </div>
<!--    <p v-for="chunk in responseChunks" :key="chunk">{{ chunk }}</p>-->
  </div>
</template>

<script>
import Echo from "laravel-echo";
import io from 'socket.io-client';

export default {
  data() {
    return {
      responseChunks: [],
    };
  },
  computed: {
    message(){
      return this.responseChunks.filter(chunk => chunk.data.delta.content).map(chunk => chunk.data.delta.content).join('');
    }
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement('textarea');
      el.value = this.message;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
  },
  mounted() {
    const echo = new Echo({
      broadcaster: 'socket.io',
      //host: 'http://localhost:6001',
      host: 'http://localhost:6001',
      client: io,
    });

    echo.channel("laravel_database_chunk").listen("MessageChunkEvent", (data) => {
      console.log(data)
      this.responseChunks.push(data);
    });
  },
};
</script>
<style lang="scss" scoped>
@import '../../index.module';
@import "PartialResponse.module.scss";
.response{
  white-space: pre-line;
  line-height: normal;
}
</style>
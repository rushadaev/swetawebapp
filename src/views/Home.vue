<template>
  <div class="home">
    <Header></Header>
    <ActionButtons :profile="profile"></ActionButtons>
    <RequestCreateBlock :profile="profile"></RequestCreateBlock>
    <hr class="separator separator__material">
    <InfoBlock></InfoBlock>
    <hr class="separator separator__material">
    <RequestsHistory @showPopup="showPopup($event)"></RequestsHistory>
  </div>
</template>

<script>
import Header from '../containers/Header/Header.vue';
import ActionButtons from "../components/ActionButtons/ActionButtons.vue";
import RequestsHistory from "../components/RequestsHistory/RequestsHistory.vue";
import InfoBlock from "../components/InfoBlock/InfoBlock.vue";
import RequestCreateBlock from "../components/RequestCreateButton/RequestCreateBlock.vue";
import axios from "axios";

export default {
  components: {
    RequestCreateBlock,
    InfoBlock,
    RequestsHistory,
    ActionButtons,
    Header
  },

  data() {
    return {
      profile: {},
    };
  },
  created() {
    this.TWA.BackButton.hide();
    this.TWA.MainButton.hide()
  },
  mounted() {
    this.TWA.ready();
    this.getProfile();
  },
  methods: {
    async getProfile(){
      const data = {
        tg_id: this.TWA.initDataUnsafe?.user?.id || 782919745,
        sb_id: this.$route.query.sbid || 0
      };
      await axios.get("https://funny-how.com/api/createOrGetProfile", {params: data}).then((response) => {
        this.profile = response.data;
      });
      // await axios.get("http://127.0.0.1:8000/api/createOrGetProfile", {params: data}).then((response) => {
      //   this.profile = response.data;
      // });
    },
    showPopup(params) {
      const par = {
        title: params.command,
        message:  params.message,
        buttons: [
          {id: "ok", type: "ok", text: "Да"},
          {id: "close", type: "close", text: "Закрыть"}
        ]
      };

      this.$router.push({
        path: '/createresponse',
        query: {
          prompt: params.prompt,
          command: params.command
        }
      })
      //
      // this.TWA.showPopup(par);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../index.module';

</style>
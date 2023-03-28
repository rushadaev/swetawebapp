<template>
  <div class="home">
    <Header></Header>
    <ActionButtons></ActionButtons>
    <RequestCreateBlock></RequestCreateBlock>
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
    return {};
  },
  created() {
    this.TWA.BackButton.hide();
    this.TWA.MainButton.hide()
  },
  mounted() {
    this.TWA.ready();
  },
  methods: {

    showPopup(params) {
      const par = {
        title: params.command,
        message:  params.message,
        buttons: [
          {id: "ok", type: "ok", text: "Да"},
          {id: "close", type: "close", text: "Закрыть"}
        ]
      };

      this.TWA.showPopup(par);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../index.module';

</style>
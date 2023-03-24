<template>
  <div class="home">
    <Header></Header>
    <ActionButtons></ActionButtons>
    <RequestCreateBlock></RequestCreateBlock>
    <hr class="separator separator__material">
  </div>
</template>

<script>

import Header from '../containers/Header/Header.vue';
import ActionButtons from "../components/ActionButtons/ActionButtons.vue";
import RequestsHistory from "../components/RequestsHistory/RequestsHistory.vue";
import InfoBlock from "../components/InfoBlock/InfoBlock.vue";
import RequestCreateBlock from "../components/RequestCreateButton/RequestCreateBlock.vue";

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
      style_selected: 'medium',
      clipboard: null,
    };
  },
  created() {
    this.TWA.BackButton.show();
    this.TWA.onEvent('backButtonClicked', this.backButtonClicked);
  },
  mounted() {
    // What is the best? mounted or created??
    this.TWA.ready();
  },
  methods: {
    backButtonClicked() {
      this.router.go(-1)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../index.module';

</style>
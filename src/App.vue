<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style_selected: 'medium',
      clipboard: null,
    };
  },
  created() {
    this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    this.TWA.onEvent('backButtonClicked', this.backButtonClicked);
  },
  mounted() {
    this.TWA.ready();
  },
  methods: {
    mainButtonClicked() {
      this.TWA.showAlert('Main button was pressed');
      window.Telegram.WebApp.showAlert('Main button was pressed version2');
    },
    backButtonClicked() {
      this.router.go(-1)
    },
    toggleBackButton() {
      if (this.TWA.BackButton.isVisible) {
        this.TWA.BackButton.hide();
      } else {
        this.TWA.BackButton.show();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.module';

</style>
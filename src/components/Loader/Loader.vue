<template>
  <div class="loader">
    <span class="pulse"></span>
  </div>
</template>
<script>
export default {
  props: [
    'loading',
    'data'
  ],
  data() {
    return {};
  },
  mounted() {
  },
  methods: {


  }

};

</script>

<style scoped lang="css">
.loader{
  margin: 0 auto;
}
.pulse {
  margin:100px;
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: var(--tg-theme-link-color);
  cursor: pointer;
  box-shadow: 0 0 0 var(--tg-theme-link-color);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 var(--tg-theme-link-color);
  }
  70% {
    -webkit-box-shadow: 0 0 0 50px var(--tg-theme-link-color);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 var(--tg-theme-link-color);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 var(--tg-theme-link-color);
    box-shadow: 0 0 0 0 var(--tg-theme-link-color);
  }
  70% {
    -moz-box-shadow: 0 0 0 50px var(--tg-theme-bg-color);
    box-shadow: 0 0 0 50px var(--tg-theme-bg-color);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 var(--tg-theme-bg-color);
    box-shadow: 0 0 0 0 var(--tg-theme-bg-color);
  }
}
</style>
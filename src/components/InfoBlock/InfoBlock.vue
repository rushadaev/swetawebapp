<template>
  <div class="container container__material">
    <div @click="$router.push({path: '/learn'})" class="InfoBlockItem InfoBlockItem__material">
      <div class="icon icon__material">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="V7jv"><path d="M21.173 6.757C19.356 5.057 16.813 4 14 4 8.477 4 4 8.07 4 13.09c0 2.864 1.338 5.212 3.614 6.878.29.213.559 1.397-.09 2.392-.265.406-.557.723-.782.966-.325.352-.51.552-.27.653.25.105 1.728.157 2.794-.441.835-.469 1.34-.936 1.681-1.25.282-.26.45-.416.599-.382.533.122 1.082.206 1.645.247l.023.001c.26.018.521.028.786.028 5.523 0 10-4.07 10-9.091 0-2.463-1.077-4.697-2.827-6.334Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path><circle cx="14" cy="13.25" r="1.25" fill="currentColor"></circle><circle cx="9" cy="13.25" r="1.25" fill="currentColor"></circle><circle cx="19" cy="13.25" r="1.25" fill="currentColor"></circle></svg>
      </div>
      <div class="content content__material">
        Инструкция
      </div>
    </div>
    <div @click="supportInit()" class="InfoBlockItem InfoBlockItem__material">
      <div class="icon icon__material">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="V7jv">
          <path d="M14,20.0678177 L12.6447395,18.8672765 C11.2959595,17.7028415 5.99903117,13.2225295 5.99903117,9.28581515 C5.99903117,6.53451082 8.11993173,4.41361026 10.8712361,4.41361026 C12.3063743,4.41361026 13.6140863,5.16838795 14.0008053,6.28919277 C14.3875243,5.16838795 15.6952363,4.41361026 17.1303745,4.41361026 C19.8816788,4.41361026 22.0025794,6.53451082 22.0025794,9.28581515 C22.0025794,13.2225295 16.7056511,17.7028415 15.3568711,18.8672765 L14,20.0678177 Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        </svg>
      </div>
      <div class="content content__material">
        Поддержка
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    supportInit(){
      TWA.sendData("/support");
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../index.module';
@import "InfoBlock.module";
.requests_header{
  padding: 20px 16px 4px;
  background: var(--tg-theme-bg-color);
  font-family: "Roboto",sans-serif;
  font-size: 15px;
  font-style: normal;
  line-height: 16px;
  font-weight: 500;
  color: var(--tg-theme-link-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2{
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    width: 100%;
  }
}
</style>
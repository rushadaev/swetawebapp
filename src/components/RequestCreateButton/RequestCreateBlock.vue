<template>
  <div class="container container__material">
    <div class="requests_create_header">
      <h2>Нейросеть</h2>
    </div>
    <div @click="$router.push('/createresponse')" class="InfoBlockItem InfoBlockItem__material">
      <div class="icon icon__material">
        <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg" class="zGiP"><circle cx="14" cy="14" r="11" stroke="currentColor" stroke-width="1.6"></circle><g fill="currentColor"><path d="M13.2 18.5a.8.8 0 0 0 1.6 0zm1.6-9a.8.8 0 0 0-1.6 0zm0 9v-9h-1.6v9z"></path><path d="M18.5 14.8a.8.8 0 0 0 0-1.6zm-9-1.6a.8.8 0 0 0 0 1.6zm9 0h-9v1.6h9z"></path></g></svg>
      </div>
      <div class="content content__material">
        Создать запрос
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '../../index.module';
@import "RequestCreateBlock.module";
.requests_create_header{
  padding: 20px 16px 4px 0px;
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
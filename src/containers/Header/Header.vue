<template>
  <section class="container container__transparent">
    <div @click="$router.push('/')" class="logotype">
      <img src="/images/sweta.jpg" alt="Sweta Antipova">
    </div>
    <h1 class="pageTitle pageTitle__material" data-testid="balance-title">Нейросеть</h1>
    <p class="pageDescription pageDescription__material">Создавай контент с помощью искусственного интеллекта</p>
    <p class="pageDescription pageDescription__material">от @sweta_anti {{$route.query?.sbid}}</p>
  </section>
</template>
<style scoped lang="scss">
@import './Header.module';
.container{
  padding: 42px 24px 0px 20px;
}
</style>
<template>
  <div v-if="profile" class="action_buttons_container">
    <template v-if="!profile.subscribed">
      <Button :onClick="() => {subscribed = !subscribed}" mode="primary">
        Оформить подписку
      </Button>
    </template>
    <template v-else>
      <Button :disabled="true">
        Подписка действительна до {{ profile.subscription_until }}
      </Button>
      <Button v-if="profile.autopay" :onClick="() => {setupAutopay(false)}" mode="destructive">Выключить автопродление</Button>
      <Button v-if="!profile.autopay" :onClick="() => {setupAutopay(true)}" mode="primary">Включить автопродление</Button>
    </template>
  </div>
</template>
<script>
import Button from "../Button/Button.vue";
import axios from "axios";
export default {
  components: {Button},
  data() {
    return {
      subscribed: true,
      profile: null,
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile(){
      const data = {
        tg_id: this.TWA.initDataUnsafe?.user?.id || 782919745,
      };
      // await axios.get("https://funny-how.com/api/createOrGetProfile", {params: data}).then((response) => {
      //   this.requests = response.data;
      // });
      await axios.get("http://127.0.0.1:8000/api/createOrGetProfile", {params: data}).then((response) => {
        this.profile = response.data;
      });
    },
    async setupAutopay(isAutopay){
      const data = {
        tg_id: this.TWA.initDataUnsafe?.user?.id || 782919745,
        isAutopay: isAutopay
      };
      await axios.post("http://127.0.0.1:8000/api/setupAutopay", data).then((response) => {
        this.profile = response.data;
      });

    }
  },
}
</script>
<style scoped lang="scss">
.action_buttons_container{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 33px 16px 16px;
}
</style>
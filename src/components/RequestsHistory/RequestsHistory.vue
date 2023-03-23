<template>
  <div class="requests_history_container">
    <div class="requests_header">
      <h2>История запросов</h2>
    </div>
    <div class="requests_history container container__material">
      <div @click="$emit('showPopup', {command: 'Создать идею', prompt: 'Блоггер на природе', 'message': 'Хотите изменить результат?'})" class="requests_history_item requests_history_item__material">
        <div class="statusText statusText__material completedStatus">
          Успешно
        </div>
        <div class="title title__material">
          Создать идею
        </div>
        <div class="text text__material">
          Запрос: Блоггер на природе
        </div>
        <div class="text text__material">
          Результат: Блоггер может выйти на природу...
        </div>
      </div>
      <div @click="$emit('showPopup', {command: 'Сгенерировать сценарий', prompt: 'Блоггер на природе', 'message': 'Попробовать еще раз?'})" class="requests_history_item requests_history_item__material">
        <div class="statusText statusText__material errorStatus">
          Ошибка
        </div>
        <div class="title title__material">
          Сгенерировать сценарий
        </div>
        <div class="text text__material">
          Запрос: Блоггер на природе
        </div>
      </div>
      <div @click="$emit('showPopup', {command: 'Сгенерировать сценарий', prompt: 'Эксперт в лесу', 'message': 'Попробовать еще раз?'})" class="requests_history_item requests_history_item__material">
        <div class="statusText statusText__material errorStatus">
          Ошибка
        </div>
        <div class="title title__material">
          Сгенерировать контент-план
        </div>
        <div class="text text__material">
          Запрос: Эксперт в лесу
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '../../index.module';
@import "RequestsHistory.module";
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
<template>
  <div class="home">
    <form>
      <div class="titleContainer titleContainer__material">
        <div class="title title__material">Создать запрос</div>
        <div class="progress progress__material">1 из 2</div>
      </div>
      <div @click="isPopover = !isPopover" class="section section__material inner">
        <div class="cellContainer cellContainer__material separator">
          <div class="inputLabel">
            Я хочу
          </div>
          <div class="inputForm">
            <div class="optionSelected" ref="reference">{{ commands.find(com => com.value == command).label }}</div>
            <div :class="{'active' : isPopover}" class="popover popover__material">
              <button v-for="com in commands" @click.prevent="command = com.value" class="optionContainer optionContainer__material">
                <div class="option option__material">
                  <div v-if="com.value == command" class="check check__material">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="geTz QDSP"><path d="m1 7 5.5 5.5L17 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </div>
                  <div class="label label__material">{{com.label}}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr class="separator separator__material">
      <div class="section section__material inner">
        <div class="sectionHeader sectionHeader__material">
          <h2 class="header">Опишите запрос</h2>
        </div>
        <div class="inputCell materialInput materialInput__material">
        <textarea v-model="prompt" placeholder="Можно добавлять уточняющие детали, например, стиль или количество символов" rows="5" class="comment comment__material"></textarea>
        </div>
      </div>
      <hr class="separator separator__material">
    </form>
  </div>
</template>
<script>
import Header from '../containers/Header/Header.vue';
import ActionButtons from "../components/ActionButtons/ActionButtons.vue";
import RequestsHistory from "../components/RequestsHistory/RequestsHistory.vue";
import InfoBlock from "../components/InfoBlock/InfoBlock.vue";
import RequestCreateBlock from "../components/RequestCreateButton/RequestCreateBlock.vue";
import {ref} from 'vue';
import {useFloating} from '@floating-ui/vue';
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
      style_selected: 'medium',
      clipboard: null,
      isPopover: false,
      prompt: '',
      commands: [
        {
          label: 'Придумать идею',
          value: 'getidea',
          prompt_template: 'Generate 10 ideas for instagram reels about '
        },
        {
          label: 'Написать сценарий',
          value: 'getscenario',
          prompt_template: 'Generate script with  for short video for Instagram about in style of script of the film '
        },
        {
          label: 'Придумать текст для поста',
          value: 'getpost',
          prompt_template: 'Write post for instagram no more than 500 symbols about '
        },
        {
          label: 'Создать контент план',
          value: 'getcontentplan',
          prompt_template: 'You are an smm specialist.You\'re task is to compose 7 days content plan for stories for an instagram blogger.Blogger\'s blog is about '
        }
      ],
      command: 'getidea'
    };
  },
  created() {
    this.TWA.BackButton.show();
    this.TWA.MainButton.show().disable();
    this.TWA.onEvent('backButtonClicked', this.backButtonClicked);
    this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    this.TWA.onEvent('popupClosed', this.popupClosed);
  },
  watch: {
    prompt(oldPrompt, newPrompt){
      if(newPrompt.length == 0){
        this.TWA.MainButton.disable();
      }
      else this.TWA.MainButton.enable();
    }

  },
  mounted() {
    // What is the best? mounted or created??
    this.TWA.ready();
  },
  methods: {
    backButtonClicked() {
      history.back()
    },
    mainButtonClicked() {
      let command = this.commands.find(com => com.value == this.command);
      // POST request using axios with set headers
      const data = {
        command: command.value,
        tg_id: this.TWA.initDataUnsafe?.user?.id,
        prompt_user: this.prompt,
        prompt_template: command.prompt_template,
      };

      axios.post("https://funny-how.com/api/getGptResponse", data);

      const par = {
        title: 'Запрос отправлен',
        message:  'В течении 20 секунд вам прийдет ответ',
        buttons: [
          {id: "ok", type: "ok", text: "Хорошо"},
        ]
      };

      this.TWA.showPopup(par);
    },
    popupClosed(){
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../index.module';

.inputForm{
  position: relative;
}
.inputCell{
  padding: 0 16px;
  margin-bottom: 14px;
  margin-top: 20px;
}
.materialInput {
  /* ! */

  &__material {
    position: relative;
    justify-content: space-between;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--separator-color);
      transition: all 0.25s ease-in-out;
    }

    &:focus-within::after {
      height: 2px;
    }

    &:not(.inputError):focus-within::after {
      background: var(--tg-theme-link-color);
    }
  }
}
.optionContainer {
  padding: 0;
  margin: 0;
  background: transparent;
  color: var(--tg-theme-text-color);
  border: none;

  &__apple {
    height: 44px;

    &::after {
      @include separator;
    }
  }

  &__material {
    height: 48px;
  }
}

.popover {
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  background-color: var(--dropdown-menu-background);
  transform: scale(0);
  padding: 8px;
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
  overflow: hidden;
  z-index: 100;
  border: none;
  outline: none;
  font-family: sans-serif;
  font-size: 16px;


  &.active{
    opacity: 1;
    transform: scale(1);
  }

  &__apple {
    --border-radius: 13px;

    min-width: 106px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 48px rgb(0 0 0 / 20%);
    backdrop-filter: blur(100px);
  }

  &__material {
    --border-radius: 6px;

    min-width: 106px;
    border-radius: var(--border-radius);
    box-shadow: 0 1px 3px 0.5px rgb(0 0 0 / 12%);
  }

  & .optionContainer:first-child {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  & .optionContainer:last-child {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  & .optionContainer:last-child::after {
    display: none;
  }
}

.option {
  display: flex;
  align-items: center;
  position: relative;
  &__apple {
    padding: 0 16px 0 13px;
    @include font-serif('-apple-system', 17px, false, normal, 22px, 400);
  }

  &__material {
    padding: 0 16px 0 13px;
    @include font-serif('Roboto', 16px, false, normal, 20px, 400);
  }
}

.check {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &__apple {
    margin-inline-end: 8px;

    path {
      fill: var(--tg-theme-text-color);
    }
  }

  &__material {
    margin-inline-end: 12px;

    path {
      stroke: var(--tg-theme-link-color);
    }
  }
}

.label {
  /* ! */

  &__apple {
    margin-inline-start: 20px;
  }

  &__material {
    margin-inline-start: 26px;
  }
}

.titleContainer {
  display: flex;
  justify-content: space-between;

  &__apple {
    padding: 40px 32px 8px;
  }

  &__material {
    padding: 26px 16px 8px;
  }
}

.title {
  /* ! */

  &__apple {
    @include font-serif('-apple-system', 17px, false, normal, 20px, 600);
  }

  &__material {
    @include font-serif('Roboto', 20px, false, normal, 26px, 600);
  }
}
.progress {
  color: var(--tg-theme-hint-color);
  white-space: nowrap;

  &__apple {
    @include font-serif('-apple-system', 17px, false, normal, 20px, 600);
  }

  &__material {
    @include font-serif('Roboto', 20px, false, normal, 26px, 600);
  }
}

.section {
  &__apple {
    .container {
      border-radius: 10px;
      overflow: hidden;
    }
  }

  &__material {
    &.inner .separator,
    &.outer .description:not(:last-child),
    &.outer .container + .separator {
      box-shadow: 0 1px 2px rgb(0 0 0 / 8%) inset;
    }

    &.inner {
      background: var(--tg-theme-bg-color);
    }
  }
}
.cellContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &__apple {
    padding: 12px 0 11px;
  }

  &__material {
    padding: 15px 0 14.5px;
  }

  &:not(.allowScroll) {
    padding-inline-end: var(--container-right-padding);
  }

  &.allowScroll {
    overflow: auto;
    white-space: nowrap;

    @include hide-scroll-bar;
  }
}

.cellContainer {
  cursor: pointer;
  white-space: nowrap;

  &__apple {
    @include font-serif('-apple-system', 14px, false, normal, 14px, 400);
  }

  &__material {
    @include font-serif('Roboto', 14px, false, normal, 14px, 400);
  }
  /* ! */
  --container-right-padding: 16px;

  &__apple {
    padding-inline-start: 16px;
  }

  &__material {
    padding-inline-start: 16px;
  }

  &:not(:last-child) .container::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: var(--separator-color);
    transform-origin: bottom left;

    @media (min-resolution: 2dppx) {
      transform: scaleY(0.5);
    }

    @media (min-resolution: 3dppx) {
      transform: scaleY(0.33);
    }
  }
}

.comment {
  width: 100%;
  border: none;
  appearance: none;
  outline: none;
  background: transparent;
  display: block;
  margin: 0;
  color: var(--tg-theme-text-color);
  padding: 0;
  resize: none;
  user-select: text;

  &__apple {
    padding-inline-end: 8px;
    @include font-serif('-apple-system', 17px, false, normal, 20px, 400);

    &::placeholder {
      color: var(--tg-theme-hint-color);
    }
  }

  &__material {
    @include font-serif('Roboto', 16px, false, normal, 20px, 400);

    &::placeholder {
      color: var(--tg-theme-text-color);
      opacity: 0.4;
    }
  }
}

.bold {
  font-weight: 600;
}
.sectionHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 4px;
  background: var(--tg-theme-bg-color);

  h2{
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    width: 100%;
  }
  &__material {
    @include font-serif('Roboto', 15px, false, normal, 16px, 500);

    color: var(--tg-theme-link-color);
  }

  &__apple {
    @include font-serif('-apple-system', 13px, false, normal, 18px, 400);

    text-transform: uppercase;
    color: var(--tg-theme-hint-color);
  }
}

</style>
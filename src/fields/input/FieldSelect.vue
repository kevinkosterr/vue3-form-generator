<template>
  <div class="vfg-select">
    <span class="vfg-select-label" :class="{'text-muted': !selectedName}" @click.prevent="onClickInput">
      <template v-if="selectedName">{{ selectedName }}</template>
      <template v-else>{{ field.placeholder || 'Select an option' }}</template>
      <span style="float:right;">
        <!-- ChevronDown from https://heroicons.com -->
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor" style="height: 15px;"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </span>
    </span>
    <div v-if="isOpened" class="vfg-select-list-container">
      <div class="vfg-select-list">
        <div
          v-for="option in field.options"
          :key="option.value"
          class="vfg-select-option"
          :class="{'selected': currentModelValue === option.value}"
          @click.prevent="selectOption(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldSelect',
  mixins: [ abstractField ],
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    selectedName () {
      return this.currentModelValue ? this.field.options.find(o => o.value === this.currentModelValue).name : undefined
    }
  },
  methods: {
    onClickInput () {
      if (this.isOpened) {
        this.isOpened = false
        return
      }
      this.isOpened = true
    },
    selectOption (option) {
      this.$emit('onInput', option.value)
      this.isOpened = false
    }
  }
}
</script>

<style>
.vue-form-generator {
  .vfg-select {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    border: 1px solid #cdcdcd;
    color: #202020;
    border-radius: 5px;
    width: 100%;
    min-height: 30px;
    background: #f4f4f4;
  }

  .vfg-select-label {
    flex: 1 0 70%;
    align-content: center;
    padding: 0 .3rem;
  }

  .vfg-select-label.text-muted {
    color: #5c5c5c;
  }

  .vfg-select-list-container {
    position: absolute;
    padding: .3rem;
    top: 32px;
    left: 0;
    right: 0;
    background: #F4F4F4FF;
    border-radius: 3px;
    max-height: 250px;
    overflow-y: auto;
  }

  .vfg-select-list {
    border-radius: inherit;
  }

  .vfg-select-option {
    padding: .3rem .5rem;
    margin-bottom: .1rem;
  }

  .vfg-select-option:first-child, .vfg-select-option:first-child:hover {
    border-radius: 3px;
  }

  .vfg-select-option:last-child, .vfg-select-option:last-child:hover {
    border-radius: 3px;
  }

  .vfg-select-option.selected {
    background: #d3d3d3;
  }

  .vfg-select-option:hover {
    background: #d3d3d3;
    cursor: pointer;
  }
}
</style>
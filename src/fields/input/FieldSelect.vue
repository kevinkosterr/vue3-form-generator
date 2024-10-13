<template>
  <div class="vfg-select">
    <span v-on-click-outside="() => isOpened = false" class="vfg-select-label" :class="{'text-muted': !selectedNames.length}" @click.prevent="onClickInput">
      <template v-if="selectedNames.length">
        <span v-for="(selectedName, index) in selectedNames" :key="selectedName">
          <template v-if="index !== 0">, </template>{{ selectedName }}
        </span>
      </template>
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
          :class="{'selected': isSelected(option)}"
          @click.prevent="selectOption(option)"
        >
          {{ option.name }}
          <span v-if="isSelected(option)" style="float: right;">
            <!-- X-Mark Icon from https://heroicons.com -->
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor" style="height: 15px;"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { abstractField } from '@/mixins'
import onClickOutside from '@/directives/onClickOutside.js'

export default {
  name: 'FieldSelect',
  directives: { onClickOutside },
  mixins: [ abstractField ],
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    selectedNames () {
      if (!this.currentModelValue) return []

      if (Array.isArray(this.currentModelValue) && this.field.multiple) {
        return this.field.options.filter(o => this.currentModelValue.includes(o.value)).map(o => o.name)
      } else {
        return [ this.field.options.find(o => o.value === this.currentModelValue).name ]
      }
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
    isSelected (option) {
      return this.currentModelValue?.includes(option.value) ?? false
    },
    selectOption (option) {
      if (!this.field.multiple) {
        const isSelected = this.currentModelValue === option.value
        this.$emit('onInput', isSelected ? '' : option.value)
      } else {
        let selectedValues = [ ...this.currentModelValue ]
        const isSelected = selectedValues.includes(option.value)

        if (isSelected) {
          selectedValues = selectedValues.filter(o => o !== option.value)
        } else {
          selectedValues.push(option.value)
        }


        this.$emit('onInput', selectedValues)
      }
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
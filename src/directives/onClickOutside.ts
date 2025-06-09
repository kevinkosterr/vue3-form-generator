import { Directive, DirectiveBinding } from 'vue'

const onClickOutside: Directive<HTMLElement, (event: Event) => void> = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding): void {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(<Node>event.target))) {
        if (typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement): void {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}

export {
  onClickOutside
}

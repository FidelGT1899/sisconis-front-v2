import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'

// Si ya tienes un router en src/router/index.ts
// LO RECOMENDADO es importarlo así:
// import router from '../router'

// Pero si no quieres tocar nada, creamos uno mínimo solo para el test:
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' },
    },
  ],
})

describe('App', () => {
  it('mounts renders properly', async () => {
    // nos aseguramos de que el router esté listo
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
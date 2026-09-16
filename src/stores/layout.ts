import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import type { LayoutState } from '@/types/layout'
import { changeHTMLAttribute } from '@/helpers/layout'

export const useLayoutStore = defineStore('layout_store', () => {
  const theme = useLocalStorage<LayoutState['theme']>('Mizzle_VUE_THEME', 'light')

  const prefersDark = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  if (theme.value === 'auto') {
    changeHTMLAttribute('data-bs-theme', prefersDark() ? 'dark' : 'light')
  }

  const setTheme = (nTheme: LayoutState['theme']) => {
    if (nTheme === 'auto') {
      theme.value = 'auto'
      changeHTMLAttribute('data-bs-theme', prefersDark() ? 'dark' : 'light')
      return
    }
    theme.value = nTheme
    changeHTMLAttribute('data-bs-theme', nTheme)
  }

  return {
    theme,
    setTheme
  }
})

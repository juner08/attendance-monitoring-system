import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = []) {

  const loadData = () => {
    try {
      const savedData = localStorage.getItem(key)

      if (savedData) {
        return JSON.parse(savedData)
      }

      return defaultValue
    } catch (error) {
      console.error(
        `Failed to load ${key} from localStorage:`,
        error
      )

      return defaultValue
    }
  }

  const data = ref(loadData())

  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(
          key,
          JSON.stringify(newValue)
        )
      } catch (error) {
        console.error(
          `Failed to save ${key} to localStorage:`,
          error
        )
      }
    },
    {
      deep: true
    }
  )

  const clear = () => {
    data.value = defaultValue
    localStorage.removeItem(key)
  }

  return {
    data,
    clear
  }
}
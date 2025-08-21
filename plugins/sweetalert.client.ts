// plugins/sweetalert.client.ts
import Swal from 'sweetalert2'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: Swal,
    },
  }
})

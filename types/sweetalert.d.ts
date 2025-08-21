// types/sweetalert.d.ts
declare module '#app' {
  interface NuxtApp {
    $swal: typeof import('sweetalert2').default
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $swal: typeof import('sweetalert2').default
  }
}

export {}

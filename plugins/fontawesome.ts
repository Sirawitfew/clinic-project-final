import { library } from '@fortawesome/fontawesome-svg-core'
import { defineNuxtPlugin } from '#app'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTachometerAlt, faBox, faUsers, faUserMd, faSearch ,faHeartbeat } from '@fortawesome/free-solid-svg-icons'

library.add(faTachometerAlt, faBox, faUsers, faUserMd)

export default defineNuxtPlugin((nuxtApp) => {
    library.add(faTachometerAlt, faBox, faUsers, faUserMd,faSearch,faHeartbeat)
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
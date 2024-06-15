import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faFolderTree } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

library.add(
  faUser,
  faRightFromBracket,
  faChevronRight,
  faHouse,
  faFolderOpen,
  faFolderTree,
  faCloudArrowUp,
  faLink,
  faFile
)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')

import {createApp} from 'vue';
import router from './router';
import App from './App';
import store from './store/index';
import BaseCard from "@/components/ui/BaseCard";
import BaseButton from "@/components/ui/BaseButton";
import BaseBadge from "@/components/ui/BaseBadge";
import BaseDialog from "@/components/ui/BaseDialog";
import BaseSpinner from "@/components/ui/BaseSpinner";

const app = createApp(App)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)
app.use(router)
app.use(store)
app.mount('#app');

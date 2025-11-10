import {createVuetify} from "vuetify/framework";
import {aliases, mdi} from "vuetify/iconsets/mdi";
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
})
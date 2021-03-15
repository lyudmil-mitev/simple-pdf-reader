<template>
    <v-app>
        FILE CHOOSER
        <v-container fluid fill-height>
            <pdf-file-chooser @file-selected="onFileSelected" @url-selected="onUrlSelected" />
        </v-container>
    </v-app>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { component } from "node_modules/vue/types/umd";
import Vue from "vue";
import Component from "vue-class-component";

import PdfFileChooser from "./file-loader/pdf-file-chooser.vue";

@Component({
    components: {
        PdfFileChooser
    }
})
export default class PdfReader extends Vue {
    page = 0

    onFileSelected() {
        return 0;
    }

    onUrlSelected() {
        return 0;
    }
}
</script>
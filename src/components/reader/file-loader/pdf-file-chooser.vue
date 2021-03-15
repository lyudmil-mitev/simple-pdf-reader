<template>
    <v-layout column class="pdf-file-chooser" align-center>
        <div class="pdf-file-chooser--button-panel">
            <v-btn @click.stop="onSelectFile">Browse file</v-btn>
            <input @change="onBrowseFileInputChanged"
              class="pdf-file-chooser--browse-file-input" ref="fileInput" type="file" accept=".pdf, application/pdf"/>
        </div>
    </v-layout>
</template>

<style lang="scss">
</style>

<script lang="ts">
import { component } from "node_modules/vue/types/umd";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PdfFileChooser extends Vue {
    onSelectFile() {
        return 0;
    }

    onBrowseFileInputChanged(e: Event) {
        return 0;
    }
}
</script>
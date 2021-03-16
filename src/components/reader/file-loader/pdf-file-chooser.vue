<template>
    <v-layout column class="pdf-file-chooser" align-center>
        <div class="pdf-file-chooser--button-panel">
            <v-btn @click.stop="onSelectFile">Choose file</v-btn>
            <input @change="onBrowseFileInputChanged"
              class="pdf-file-chooser--browse-file-input" ref="fileInput" type="file" accept=".pdf, application/pdf"/>
        </div>
    </v-layout>
</template>

<style lang="scss">
    .pdf-file-chooser--browse-file-input {
        display: none;
    }
</style>

<script lang="ts">
import { component } from "node_modules/vue/types/umd";
import Vue from "vue";
import { Emit } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class PdfFileChooser extends Vue {
    onSelectFile() {
        const fileInputElement = this.$refs.fileInput as HTMLElement;
        // TODO: Fix File Chooser for Android
        fileInputElement.click();
    }

    onBrowseFileInputChanged(e: Event) {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length) {
            this.fileSelected(files[0]);
        }
    }

    @Emit()
    fileSelected(_file: Blob | string) {
        // ...
    }

    @Emit()
    urlSelected(_url: string, _fileSize?: number) {
        // ...
    }
}
</script>
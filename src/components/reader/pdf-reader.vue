<template>
    <v-app>
        <div class="text-center pdf-reader-main--title">
            <h1>Simple PDF Reader</h1>
        </div>
        <v-container v-if="state === 'empty'" fluid fill-height>
            <pdf-file-chooser @file-selected="onFileSelected" @url-selected="onUrlSelected" />
        </v-container>
        <v-container v-if="state === 'loading'">
            Loading book ...
        </v-container>
        <v-container v-if="state === 'reading'">
            <div class="pdf-reader-main--pagewrap">
                <pdf-page v-for="page in pages"
                          :key="page.index" 
                          :page="page">
                </pdf-page>
                <div class="text-center pdf-reader--pagecounter">
                Page {{ currentPage }} of {{ numberOfPages }}
                </div>
            </div>
            <!-- <pdf-navigation v-bind:currentPage="currentPage" v-bind:numberOfPages="numberOfPages"></pdf-navigation> -->
        </v-container>
    </v-app>
</template>

<style lang="scss">

</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PdfFileChooser from "./file-loader/pdf-file-chooser.vue";
import PdfNavigation from "./navigation/pdf-navigation.vue";
import PdfPage from "./pdf/pdf-page.vue";
import { readerModel } from "../../models/pdf-reader-model";
import { PDFDocumentProxy, PDFPageProxy } from "node_modules/@types/pdfjs-dist";
import { range } from "lodash";

export interface PdfPageEntry {
    index: number;
    pdfpage: PDFPageProxy;
}

@Component({
    components: {
        PdfFileChooser,
        PdfPage,
        PdfNavigation
    }
})

export default class PdfReader extends Vue {
    defaultPageIndex = 1;
    defaultPrerenderNumber = 5;
    currentPage = 0;
    numberOfPages = 0;
    pages: Array<PdfPageEntry> = [];
    state: 'empty' | 'loading' | 'reading' = 'empty';

    onFileSelected(file: Blob) {
        this.state = "loading";
        readerModel.loadPdfFromBlob(file)
            .then(pdf => { 
                this.numberOfPages = pdf.numPages;
                const pages = range(this.defaultPageIndex, this.numberOfPages).map(index => {
                    const page = this.loadPage(pdf, index);
                    page.then(p => this.addPage(p));
                    return page;
                })
                return Promise.all(pages);
            })
            .then(pages => {
                this.state = 'reading';
                console.log("PAGES", this.pages);
            })
    }

    async loadPage(document: PDFDocumentProxy, page: number) {
        return document.getPage(page);
    }

    addPage(page: PDFPageProxy) {
        this.pages.push({
            "index": page.pageNumber,
            "pdfpage": page
        });
    }

    onUrlSelected() {
        // ...
    }
}
</script>
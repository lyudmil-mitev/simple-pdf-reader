<template>
    <v-app>
        <div class="pdf-page-view--main">
            <canvas ref="pdfCanvas" v-bind="canvasAttributes" v-bind:style="canvasStyle" />
            <div ref="pdfTextLayer" class="pdf-page-view--text-layer" v-bind:style="textLayerStyle"></div>
            <h5 v-if="state === 'loading'">Loading page {{ page.index }}...</h5>
        </div>
    </v-app>
</template>

<style lang="scss">
    .pdf-page-view--main {
        position: relative;
    }

    .pdf-page-view--text-layer {
        position: absolute;
        top: 0;
        left: 0;
    }

    .pdf-page-view--text-layer > * {
        color: transparent;
        position: absolute;
        white-space: pre;
        cursor: text;
        transform-origin: 0% 0%;
        z-index: 111;
        line-height: 1;
        user-select: text;
    }

</style>

<script lang="ts">
import { PDFPageViewport, PDFRenderParams, PDFRenderTask, PDFRenderTextLayer } from 'node_modules/@types/pdfjs-dist';
import { PdfPageEntry } from '../pdf-reader.vue';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { TextLayerRenderParameters, TextLayerRenderTask } from 'node_modules/pdfjs-dist/types/display/text_layer';
import { readerModel } from "../../../models/pdf-reader-model";
import { PageViewport } from 'node_modules/pdfjs-dist/types/display/display_utils';

const visible = require("../../../directives/visible");

function isElementInView(el: HTMLElement) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

@Component({
    directives: {
        visible,
    }
})
export default class PdfPage extends Vue {
   state: 'loading' | 'rendered' = 'loading';
   drawTask!: PDFRenderTask;
   textLayerTask!: Promise<TextLayerRenderTask>;
   quality = 1.5;
   @Prop() page!: PdfPageEntry;

   canvasAttributes = {
       width: 0,
       height: 0,
   }

   canvasStyle = {
       transform: "scale(1)",
       transformOrigin: "top left",
   }

   textLayerStyle = {
       transform: "scale(1)",
       transformOrigin: "top left",
   }

   mounted() {
       this.$nextTick().then(() => {
           window.addEventListener('scroll', this.onScroll);
           this.onScroll();
       })
   }

   onScroll() {
       const canvas = this.$refs.pdfCanvas as HTMLCanvasElement;
       if (canvas && isElementInView(canvas)) {
            this.drawPage();
       }
   }

   beforeDestroy() {
       window.removeEventListener('scroll', this.onScroll);
       this.destroyDrawTask();
   }

   drawPage() {
       if (this.state == 'rendered') {
           return;
       }
       this.state = 'rendered';
       
       const nativeSize = this.page.pdfpage.getViewport({ scale: 1});
       const ratio = nativeSize.width / nativeSize.height;

       const canvasScale = window.innerHeight * this.quality / nativeSize.height;


       const viewport = this.page.pdfpage.getViewport({ scale: canvasScale });
       const canvas = this.$refs.pdfCanvas;
       this.canvasAttributes.height = window.innerHeight * this.quality;
       this.canvasAttributes.width = window.innerHeight * ratio * this.quality;
       this.canvasStyle.transform = "scale(" + 1 / this.quality + ")";
       this.textLayerStyle.transform = this.canvasStyle.transform;

       const canvasContext = (canvas as HTMLCanvasElement).getContext('2d');
       const container = this.$refs.pdfTextLayer as HTMLElement;
       const renderContext = {canvasContext, viewport} as PDFRenderParams;
       this.drawTask = this.page.pdfpage.render(renderContext);
       this.page.pdfpage.getTextContent().then((textContent) => {
            this.textLayerTask = readerModel.getTextLayer({
                textContent, container, viewport,
            });
            this.textLayerTask.then(this.textLayerRendered);
       });


       this.drawTask.promise.then(this.pageRendered);
   }

    destroyDrawTask() {
      if (!this.drawTask) {
           return;
      }
      
      this.drawTask.cancel();
    }

   @Emit()
   pageRendered() {
      console.log("Page", this.page.index, "rendered!!")
   }

   @Emit()
   textLayerRendered() {
      console.log("Text layer", this.page.index, "rendered!!")
   }
       
}
</script>
import { getDocument, PDFDocumentProxy, PDFRenderTextLayer } from 'pdfjs-dist/webpack';
import { renderTextLayer } from 'pdfjs-dist';
import { TextLayerRenderParameters } from 'pdfjs-dist/types/display/text_layer';

export class PdfReaderModel {
    async loadPdfFromBlob(blob: Blob) {
        return new Promise<PDFDocumentProxy>((resolve, reject) => {
            this.readFileBlob(blob)
                .then(pdfArray => getDocument(pdfArray).promise)
                .then(pdf => resolve(pdf))
        })
    }

    async getTextLayer(params: TextLayerRenderParameters) {
        return renderTextLayer(params);
    }

    async loadPdfFromUrl(url: string) {
        return getDocument(url).promise;
    }

    async readFileBlob(blob: Blob) {
        return new Promise<Uint8Array>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = function(e: Event) {
                const arrayBuffer = fileReader.result as ArrayBuffer;
                resolve(new Uint8Array(arrayBuffer));
            }
            fileReader.onerror = function(e: Event) {
                reject()
            }
            fileReader.readAsArrayBuffer(blob);
        })
    }
}

export const readerModel = new PdfReaderModel;
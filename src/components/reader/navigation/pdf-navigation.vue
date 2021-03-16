<template>
    <v-layout column class="pdf-navigation-view">
        <div class="row pdf-navigation-view--main">
            <!-- @keydown.left="navigateLeft"
            @keydown.right="navigateRight" -->
            <v-btn text icon 
                class="pdf-navigation-view--toc"
                @click.stop="toggleTableOfContents">
            <v-icon menu></v-icon></v-btn>
            <v-slider
                class="pdf-navigation-view--progress-bar"
                min="1"
                :max="numberOfPages"
                step="1"
                @change="onProgressBarChanged"
            ></v-slider>
            <v-btn text icon 
                class="pdf-navigation-view--zoom-in"
                @click.stop="zoomIn">
            <v-icon magnify-plus></v-icon></v-btn>
            <v-btn text icon 
                class="pdf-navigation-view--zoom-out"
                @click.stop="zoomOut">
            <v-icon magnify-minus></v-icon></v-btn>
            <v-btn text icon
                class="pdf-navigation-view--settings"
                @click.stop="toggleSettings"
            ><v-icon settings></v-icon></v-btn>
        </div>
    </v-layout>

</template>

<style lang="scss">
</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PdfNavigation extends Vue {

    numberOfPages = 0;

    navigateLeft() {
        // ...
    }

    navigateRight() {
        // ...
    }

    toggleSettings() {
        // ...
    }

    toggleTableOfContents() {
        // ...
    }

    onProgressBarChanged() {
        // ...
    }

    zoomIn() {
        // ...
    }

    zoomOut() {
        // ...
    }
}
</script>
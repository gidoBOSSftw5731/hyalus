<!--
https://github.com/lusaxweb/vuesax/blob/master/src/components/vsDivider/vsDivider.vue
MIT License

Copyright (c) 2018 ldrovira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->

<template lang="html">
  <div class="vs-component vs-divider h-4">
    <span
      :class="borderClass"
      :style="afterStyle"
      class="vs-divider-border after"
    />
    <span
      v-if=" icon || $slots.default"
      :style="{
        'color': textColor,
        'background': backgroundColor
      }"
      :class="textAndBackgroundClass"
      class="vs-divider--text"
    >
      <template v-if="!icon">
        <slot/>
      </template>

      <vs-icon
        v-else
        :icon-pack="iconPack"
        :icon="icon"
        class="icon-divider notranslate vs-divider--icon"
      ></vs-icon>
    </span>
    <span
      :style="beforeStyle"
      :class="borderClass"
      class="vs-divider-border before"
    />
  </div>
</template>

<script>
import _color from './color.js'
export default {
  name: "VsDivider",
  props:{
    color:{
      type:String,
      default:'rgba(0, 0, 0,.1)'
    },
    background:{
      type:String,
      default:'transparent'
    },
    icon:{
      default:null,
      type:String
    },
    borderStyle:{
      default:'solid',
      type:String
    },
    borderHeight:{
      default:'1px',
      type:String
    },
    position:{
      default:'center',
      type:String
    },
    iconPack:{
      default:'material-icons',
      type:String
    },
  },
  computed:{
    getWidthAfter(){
      let widthx = '100%'
      if(this.position == 'left'){
        widthx = '0%'
      } else if (this.position == 'left-center') {
        widthx = '25%'
      } else if (this.position == 'right-center') {
        widthx = '75%'
      } else if (this.position == 'right') {
        widthx = '100%'
      }
      return widthx
    },
    getWidthBefore(){
      let widthx = '100%'
      if(this.position == 'left'){
        widthx = '100%'
      } else if (this.position == 'left-center') {
        widthx = '75%'
      } else if (this.position == 'right-center') {
        widthx = '25%'
      } else if (this.position == 'right') {
        widthx = '0%'
      }
      return widthx
    },
    borderColor() {
      if (!_color.isColor(this.color)) {
        return _color.getColor(this.color)
      }
    },
    afterStyle() {
      const classes = {
        width: this.getWidthAfter,
        'border-top-width': this.borderHeight,
        'border-top-style': this.borderStyle
      }
      if (!_color.isColor(this.color)) {
        classes['border-top-color'] = this.borderColor
      }
      return classes
    },
    beforeStyle() {
      const classes = {
        width: this.getWidthBefore,
        'border-top-width': this.borderHeight,
        'border-top-style': this.borderStyle
      }
      if (!_color.isColor(this.color)) {
        classes['border-top-color'] = this.borderColor
      }
      return classes
    },
    borderClass() {
      const classes = {}
      let borderColor = _color.isColor(this.color) ? this.color : 'default'
      classes[`vs-divider-border-${borderColor}`] = true
      return classes
    },
    textColor() {
      if (!_color.isColor(this.color)) {
        return _color.getColor(this.color !== 'rgba(0, 0, 0,.1)' ? this.color : null)
      }
    },
    backgroundColor() {
      if (!_color.isColor(this.background)) {
        return _color.getColor(this.background)
      }
    },
    textAndBackgroundClass() {
      const classes = {}
      let textColor = _color.isColor(this.color) ? this.color : 'default'
      classes[`vs-divider-text-${textColor}`] = true
      let backgroundColor = _color.isColor(this.background) ? this.background : 'default'
      classes[`vs-divider-background-${backgroundColor}`] = true
      return classes
    }
  }
}
</script>
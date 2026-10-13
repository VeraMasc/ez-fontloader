import { App,Plugin } from "obsidian";
import { FontData } from "./FontData";
import EzFontloaderPlugin from "./main";

/**Generates the style element that will be used to insert the fonts */
export function generateStyle(plugin:Plugin) {
    let origin = (plugin.app as any).customCss.styleEl as HTMLStyleElement;
    let element = createEl('style',{type:"text/css",text:"\n/* EZ Fontloader style block */\n\n"});
    origin.parentElement?.insertAfter(element,origin)
    return element;
}

/** Declares all the font faces inside an existing style element */
export function declareFontFaces(style:HTMLStyleElement, fonts:FontData[], plugin:EzFontloaderPlugin){
    let faces = fonts.map(f => f.getFontfaceCss(plugin)+"\n\n").join('')
    style.appendText(faces);
}

/** Declares all the font faces inside an existing style element */
export function resetFontFaces(style:HTMLStyleElement, fonts:FontData[], plugin:EzFontloaderPlugin){
    clearFontFaces(style)
    declareFontFaces(style, fonts, plugin);
}

function clearFontFaces(style:HTMLStyleElement) {
    while (style.firstChild) {
        style.removeChild(style.firstChild);
    }
    style.appendText("\n/* EZ Fontloader style block */\n\n")
}


/** Escapes quotes and backslashes in CSS strings so font family names cannot break @font-face/font-family syntax. */
export function  escapeCssString(str: string) {
    return str.replace(/(?=['"\\])/g, '\\')
}


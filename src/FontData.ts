import { normalizePath } from "obsidian";
import EzFontloaderPlugin from "./main";
import { PluginSettings } from "./PluginSettings";
import { escapeCssString } from "./style generator";

/**Data of each specific font */

export class FontData {


    name: string;
    file: string;
    weight: number;
    style: string;
    unicodeRange?: string;

    constructor(name: string, file: string, weight: number, style: string) {
        this.name = name;
        this.file = file;
        this.weight = weight;
        this.style = style;
    }

    /** Generates the fontface of the font */
    getFontface(plugin:EzFontloaderPlugin) {
        let {settings, app:{vault:{adapter}}} = plugin;
        let normalPath = normalizePath(settings.fontPath+this.file);
        console.log(normalPath)
        console.log(adapter.list(normalPath))
        let uri = adapter.getResourcePath(normalPath)
        return `@font-face {
        font-family: '${escapeCssString(this.name)}';
        src: url("${uri}");
        font-style: ${this.style};
        font-weight: ${this.weight};
        font-display: swap;
        ${this.unicodeRange ? `unicode-range: ${this.unicodeRange};` : ''}
    }`;
    }

    /** Renders the font information in the settings tab */
    renderSettings(containerEl:HTMLElement){
        var group = containerEl.createEl('div', {cls:"setting-item"})
        group.createEl('h6', {text:this.name})
        group.createSpan({text:this.file})
        return group;
    }

    /** Generates the font data from an existing object */
    static fromObject(data: any) {
        return new FontData(data.name, data.file, data.weight, data.style);
    }
}

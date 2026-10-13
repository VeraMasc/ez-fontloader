import { normalizePath, Setting, TFile , SettingDefinitionGroup} from "obsidian";
import EzFontloaderPlugin from "./main";
import { PluginSettings } from "./PluginSettings";
import { escapeCssString } from "./style generator";

/**Data of each specific font */

export class FontData {


    name: string;
    file: string;
    weight: string;
    style: string;
    unicodeRange?: string;

    constructor(name: string, file: string, weight: string, style: string) {
        this.name = name;
        this.file = file;
        this.weight = weight;
        this.style = style;
    }

    /** Generates the fontface css of the font */
    getFontfaceCss(plugin:EzFontloaderPlugin) {
        let {settings, app:{vault:{adapter}}} = plugin;
        let normalPath = normalizePath(settings.fontPath+this.file);
        console.log(normalPath)
        console.log(adapter.list(normalPath))
        let uri = adapter.getResourcePath(normalPath);
        
        return `@font-face {
        font-family: '${escapeCssString(this.name)}';
        src: url("${uri}");
        font-style: ${this.style};
        font-weight: ${this.weight};
        font-display: swap;
        ${this.unicodeRange ? `unicode-range: ${this.unicodeRange};` : ''}
    }`;
    }

    /** Gets the fontface metadata of the font */
    getFontface(plugin:EzFontloaderPlugin){
        let {settings, app:{vault:{adapter}}} = plugin;
        let normalPath = normalizePath(settings.fontPath+this.file);
        console.log(normalPath)
        console.log(adapter.list(normalPath))
        let uri = adapter.getResourcePath(normalPath)
        // TODO: Implement
        // return new FontFace()
    }

    /** Renders the font information in the settings tab */
    renderSettings(containerEl:HTMLElement, plugin: EzFontloaderPlugin){
        var group = containerEl.createEl('div', {cls:"setting-item"})
        var bloc = group.createEl('details')
        let summary = bloc.createEl('summary')
        summary.createEl('h6',{text:this.file})
        new Setting(bloc)
                    .setName("Font Name")
                    .setTooltip("Name that the font will use in css")
                    .addTextArea(
                        area => {
                            area.setValue(this.name ??'')
                            area.onChange(v => this.name = v)
                        }
                    )
        
        new Setting(bloc)
                    .setName("Weight")
                    .setTooltip("Weight of the font")
                    .addTextArea(
                        area => {
                            area.setValue(this.weight)
                            area.onChange(v => this.weight = v)
                        }
                    )
        return group;
    }

    /** Generates the font data from an existing object */
    static fromObject(data: any) {
        return new FontData(data.name, data.file, data.weight, data.style);
    }

    /** Generates the font data from an existing object */
    static fromFont(file: TFile) {
        let name = file.name;
        let weightMatch = name.match(/\d\d\d/)?.[0];
        return new FontData('', file.path, weightMatch || '400', 'normal');
    }
}

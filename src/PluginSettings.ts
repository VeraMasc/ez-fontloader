import { App, PluginSettingTab, Setting } from 'obsidian';
import { FontData } from './FontData';
import EzFontloaderPlugin from './main';

export interface PluginSettings {
	/**Relative path to the vault where fonts are stored */
	fontPath: string;
	fonts: FontData[];
}
export const DEFAULT_SETTINGS: PluginSettings = {
	fontPath: "/Fonts/",
	fonts: [],
};

export class SettingsTab extends PluginSettingTab {
	plugin: EzFontloaderPlugin;

	constructor(app: App, plugin: EzFontloaderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl, plugin } = this;
		// TODO: Implement Path suggestions for font root
		new Setting(containerEl)
			.setName("Font folder path")
			.setDesc("Path of the folder where font files are stored")
			.addText(text => text
				.setPlaceholder('Font Folder')
				.setValue(this.plugin.settings.fontPath)
				.onChange(async (value) => {
					this.plugin.settings.fontPath = value;
					await this.plugin.saveSettings();
				}));
		var list = containerEl.createEl('div', {cls:'setting-group mod-list'})
		list.createEl('div',{cls:"setting-item item-heading", text:"Active Fonts"})
		var content = list.createEl('div',{cls:"setting-items"})
		for(let font of plugin.settings.fonts){
			font.renderSettings(content)
		}
	}
}
import { Plugin } from 'obsidian';
import { declareFontFaces, generateStyle } from './style generator';
import { PluginSettings, DEFAULT_SETTINGS } from './PluginSettings';
import { FontData } from './FontData';


export default class EzFontloaderPlugin extends Plugin {
	settings!: PluginSettings;
	styleEl!: HTMLStyleElement
	async onload(): Promise<void> {
		this.styleEl = generateStyle(this);
		await this.loadSettings();
		declareFontFaces(this.styleEl,this.settings.fonts, this)
		// this.addSettingTab(new FontsourceSettingsTab(this.app, this));

		// this.registerEvent(
		// 	this.app.workspace.on('window-open', (_workspaceWindow, window) => {
		// 		// void this.initializeFonts(window.document).catch((error: unknown) => {
		// 		// 	console.error('Unable to load fonts in popout window:', error);
		// 		// });
		// 	}),
		// );
	}



	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<PluginSettings>,
		);
		this.settings.fonts = this.settings.fonts.map(f => FontData.fromObject(f))
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	onunload(): void {
		this.styleEl.detach() //Clear style element
	}
}

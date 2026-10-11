import { FontData } from './FontData';

export interface PluginSettings {
	/**Relative path to the vault where fonts are stored */
	fontPath: string;
	fonts: FontData[];
}
export const DEFAULT_SETTINGS: PluginSettings = {
	fontPath: "/Fonts/",
	fonts: [],
};

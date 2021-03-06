import _structs = require('./structs');

import PspLanguages = _structs.PspLanguages;
import ButtonPreference = _structs.ButtonPreference;

export class Config {
	language = PspLanguages.ENGLISH;
	buttonPreference = ButtonPreference.NA;

	constructor() {
		this.language = this.detectLanguage();
	}

	private detectLanguage() {
		// en_US
		switch (navigator.language.split(/[_\-]/g)[0]) {
			case 'ja': return PspLanguages.JAPANESE;
			case 'en': return PspLanguages.ENGLISH;
			case 'fr': return PspLanguages.FRENCH;
			case 'es': return PspLanguages.SPANISH;
			case 'de': return PspLanguages.GERMAN;
			case 'it': return PspLanguages.ITALIAN;
			case 'nl': return PspLanguages.DUTCH;
			case 'pt': return PspLanguages.PORTUGUESE;
			case 'ru': return PspLanguages.RUSSIAN;
			case 'ko': return PspLanguages.KOREAN;
			// @TODO which value have navigators for chinese?
			case 'zh': return PspLanguages.TRADITIONAL_CHINESE;
			case 'zh2': return PspLanguages.SIMPLIFIED_CHINESE;
			default: return PspLanguages.ENGLISH;
		}
	}
}

import en from './en';
import zh from './zh';
import { App } from 'obsidian';

export type Language = 'en' | 'zh' | 'auto';

export interface LanguageSetting {
    language: Language;
}

export interface LocaleData {
    [key: string]: any;
}

export class I18n {
    private app: App;
    private locale: LocaleData;
    private settings: LanguageSetting;

    constructor(app: App, settings: LanguageSetting) {
        this.app = app;
        this.settings = settings;
        this.locale = this.getLocale();
        console.log("I18n initialized with language setting:", settings.language);
        console.log("Active locale:", this.getCurrentLanguage());
    }

    private getLocale(): LocaleData {
        // Get language setting
        const language = this.settings.language;
        
        if (language === 'auto') {
            // Use localStorage to get Obsidian language setting
            let obsidianLocale = 'en';
            try {
                // Get Obsidian language setting from localStorage
                const lang = window.localStorage.getItem('language');
                obsidianLocale = lang || 'en'; // Default to English if null
                console.log("Detected Obsidian language from localStorage:", obsidianLocale);
            } catch (e) {
                console.error("Failed to detect Obsidian language:", e);
            }
            
            // Choose our language pack based on Obsidian's language
            if (obsidianLocale === 'zh' || obsidianLocale === 'zh-TW' || obsidianLocale === '简体中文') {
                console.log("Using Chinese locale based on Obsidian setting");
                return zh;
            }
            
            // Default to English
            console.log("Using English locale as default");
            return en;
        }
        
        // Explicitly choose language
        switch (language) {
            case 'zh':
                console.log("Using Chinese locale based on explicit setting");
                return zh;
            case 'en':
            default:
                console.log("Using English locale based on explicit setting");
                return en;
        }
    }
    
    // Get the currently used language
    public getCurrentLanguage(): string {
        if (this.locale === zh) {
            return 'zh';
        } else {
            return 'en';
        }
    }

    // Update language settings
    public updateSettings(settings: LanguageSetting): void {
        console.log("Updating language setting from", this.settings.language, "to", settings.language);
        const oldLocale = this.getCurrentLanguage();
        this.settings = settings;
        this.locale = this.getLocale();
        const newLocale = this.getCurrentLanguage();
        console.log("Language changed:", oldLocale, "->", newLocale);
    }

    // Get translated text
    public t(key: string, ...args: any[]): string {
        // Support dot-separated paths, such as 'settings.title'
        const keys = key.split('.');
        let value: any = this.locale;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Return key name as fallback
            }
        }
        
        if (typeof value !== 'string') {
            console.warn(`Translation value is not a string: ${key}`);
            return key;
        }
        
        // Support simple parameter replacement, such as 'Hello, {0}!'
        if (args.length > 0) {
            return value.replace(/{(\d+)}/g, (match: string, number: number) => {
                return typeof args[number] !== 'undefined' ? String(args[number]) : match;
            });
        }
        
        return value;
    }
} 
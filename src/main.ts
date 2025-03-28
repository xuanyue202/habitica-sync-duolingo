import { Plugin } from "obsidian";
import { HabiticaSyncSettingsTab } from "./settings";
import { HabiticaSyncView, VIEW_TYPE} from "./view"
import { I18n, Language } from "./lang";

interface HabiticaSyncSettings {
    userID: string
    apiToken: string
    showTaskDescription: boolean
    showSubTasks: boolean
    dueDateFormat: string
    language: Language
}

const DEFAULT_SETTINGS: Partial<HabiticaSyncSettings> = {
    userID: "",
    apiToken: "",
    showTaskDescription: true,
    showSubTasks: true,
    dueDateFormat: "DD-MM-YYYY",
    language: "auto"
}

export default class HabiticaSync extends Plugin {
    settings: HabiticaSyncSettings;
    view: HabiticaSyncView;
    i18n: I18n;

    async onload() {
        console.log("load plugin: habitica-sync");
        await this.loadSettings();
        
        // Detect Obsidian language setting
        try {
            // Get Obsidian language setting from localStorage
            const obsidianLang = window.localStorage.getItem('language') || 'en';
            console.log("Obsidian language detected from localStorage:", obsidianLang);
        } catch (e) {
            console.error("Failed to detect Obsidian language:", e);
        }
        
        // Initialize i18n instance
        this.i18n = new I18n(this.app, { language: this.settings.language });
        console.log("Plugin language set to:", this.settings.language);
        
        this.addSettingTab(new HabiticaSyncSettingsTab(this.app, this));
        this.registerView(
            VIEW_TYPE,
            (leaf) => (new HabiticaSyncView(leaf, this))
          );
        this.addRibbonIcon("popup-open", this.i18n.t("view.title"), () => {
            this.activateView();
        });
        this.addCommand({
            id: "habitica-view-open",
            name: this.i18n.t("view.title"),
            hotkeys: [{ modifiers: ["Mod", "Shift"], key: "h"}],
            callback: () => {
                this.activateView();
            }
        });

    }
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    }
    async saveSettings() {
        await this.saveData(this.settings);
        
        // Update i18n instance settings
        if (this.i18n) {
            this.i18n.updateSettings({ language: this.settings.language });
        }
    }

    async onunload() {
        await this.view.onClose();

        this.app.workspace
            .getLeavesOfType(VIEW_TYPE)
            .forEach((leaf) => leaf.detach());
    }
    async activateView() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE);

        await this.app.workspace.getRightLeaf(false).setViewState({
          type: VIEW_TYPE,
          active: true,
        });

        this.app.workspace.revealLeaf(
          this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]
        );
      }

}

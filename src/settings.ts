import HabiticaSync from "./main";
import { App, PluginSettingTab, Setting, DropdownComponent, Notice } from "obsidian";
import moment from "moment";
import { Language } from "./lang";

export class HabiticaSyncSettingsTab extends PluginSettingTab {
    plugin: HabiticaSync;

    constructor(app: App, plugin: HabiticaSync) {
        super(app, plugin)
        this.plugin = plugin
    }

    display(): void {
        let { containerEl } = this;
        containerEl.empty();

        const { i18n } = this.plugin;

        new Setting(containerEl)
        .setName(i18n.t("settings.userID.name"))
        .setDesc(i18n.t("settings.userID.desc"))
        .addText((text) => 
            text
                .setPlaceholder("User ID")
                .setValue(this.plugin.settings.userID)
                .onChange(async (value) => {
                    this.plugin.settings.userID = value;
                    await this.plugin.saveSettings();
                })
        );

        new Setting(containerEl)
        .setName(i18n.t("settings.apiToken.name"))
        .setDesc(i18n.t("settings.apiToken.desc"))
        .addText((text) => 
            text
                .setPlaceholder("API Token")
                .setValue(this.plugin.settings.apiToken)
                .onChange(async (value) => {
                    this.plugin.settings.apiToken = value;
                    await this.plugin.saveSettings();
                })
        );

        new Setting(containerEl)
        .setName(i18n.t("settings.showTaskDescription.name"))
        .setDesc(i18n.t("settings.showTaskDescription.desc"))
        .addToggle(cb => {
            cb
                .setValue(this.plugin.settings.showTaskDescription)
                .onChange(async (isEnable) => {
                    this.plugin.settings.showTaskDescription = isEnable;
                    await this.plugin.saveSettings();
                })
            });

        new Setting(containerEl)
        .setName(i18n.t("settings.showSubTasks.name"))
        .setDesc(i18n.t("settings.showSubTasks.desc"))
        .addToggle(cb => {
            cb
                .setValue(this.plugin.settings.showSubTasks)
                .onChange(async (isEnable) => {
                    this.plugin.settings.showSubTasks = isEnable;
                    await this.plugin.saveSettings();
                })
            });
            
        new Setting(containerEl)
        .setName(i18n.t("settings.dueDateFormat.name"))
        .setDesc(i18n.t("settings.dueDateFormat.desc") + " " + moment().format(this.plugin.settings.dueDateFormat))
        .addText((text) => 
            text
                .setPlaceholder("DD-MM-YYYY")
                .setValue(this.plugin.settings.dueDateFormat)
                .onChange(async (value) => {
                    this.plugin.settings.dueDateFormat = value;
                    await this.plugin.saveSettings();
                })
        );
        
        // Add language selection setting
        new Setting(containerEl)
        .setName(i18n.t("settings.language.name"))
        .setDesc(i18n.t("settings.language.desc"))
        .addDropdown((dropdown: DropdownComponent) => {
            dropdown
                .addOption("auto", i18n.t("settings.language.auto"))
                .addOption("en", i18n.t("settings.language.en"))
                .addOption("zh", i18n.t("settings.language.zh"))
                .setValue(this.plugin.settings.language)
                .onChange(async (value: string) => {
                    const previousLanguage = this.plugin.settings.language;
                    this.plugin.settings.language = value as Language;
                    await this.plugin.saveSettings();
                    
                    // If language setting has changed, show a restart notification
                    if (previousLanguage !== value) {
                        new Notice(i18n.t("notices.languageChanged"));
                    }
                });
        });
    }
}
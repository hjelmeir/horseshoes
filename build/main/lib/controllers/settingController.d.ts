import { Settings, SettingsAction } from '../models/setting';
export declare const drawerToggle: (identifier: string, collapse: boolean) => SettingsAction;
export declare const settingReducer: (state: Settings, action: SettingsAction) => Settings;

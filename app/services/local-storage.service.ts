import type { ExportModel } from "~/models/export.model";

export enum LocalStorageKey {
  LanguageLearnData = 'languageLearnData'
}

export class LocalStorageService {
  public static save(exportModel: ExportModel): void {
    if (typeof localStorage !== 'undefined' && localStorage) {
      localStorage.setItem(LocalStorageKey.LanguageLearnData, JSON.stringify(exportModel));
    }
  }
  
  public static load(): ExportModel | null {
    if (typeof localStorage === 'undefined' || !localStorage) {
      return null;
    }
    const result = localStorage.getItem(LocalStorageKey.LanguageLearnData);
    return result ? JSON.parse(result) : null;
  }
}
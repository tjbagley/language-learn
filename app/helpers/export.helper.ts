import { saveAs } from "file-saver";
import moment from "moment";
import type { Category } from "~/models/category";
import type { ExportModel } from "~/models/export.model";
import type { WordList } from "~/models/word-list";
import type { WordOrPhrase } from "~/models/word-or-phrase";

export class ExportHelper {
  public static lastLoadedFileName: string = "";

  public static export(words: WordOrPhrase[], categories: Category[], lists: WordList[], recentlyLearntWordsAndPhrases: string[]): void {
    const model: ExportModel = {
      language: {
        wordsOrPhrases: words || [],
        dialogues: lists || [],
        learn: {
          recentWordsAndPhrases: recentlyLearntWordsAndPhrases || []
        }
      },
      categories: categories || [],
      exportDate: moment().format("YYYY-MM-DD")
    };
    const modelText = JSON.stringify(model);
    const blob = new Blob([modelText], { type: "text/json" });
    saveAs(blob, this.lastLoadedFileName ? this.lastLoadedFileName : `lang-learn.json`);
  }
}

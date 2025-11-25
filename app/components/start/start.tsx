import type { ChangeEvent } from "react";
import "./start.scss";

import { useNavigate } from "react-router";
import type { ExportModel } from "~/models/export.model";
import { loadCategories } from "~/store/slices/categories.slice";
import { store } from "~/store/store";
import { loadWords } from "~/store/slices/words-phrases.slice";
import { loadWordLists } from "~/store/slices/word-lists.slice";
import { ExportHelper } from "~/helpers/export.helper";

export function Start() {
  const navigate = useNavigate();

  const handleNewLanguageClick = () => {
    navigate("/words");
  };

  const handleFileUploadChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      ExportHelper.lastLoadedFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const modelText = reader.result?.toString() ?? "";
        const model: ExportModel = JSON.parse(modelText);
        if (model?.categories && model?.language) {
          if (model?.categories?.length > 0) {
            store.dispatch(loadCategories(model.categories)); 
          }
          if (model?.language?.wordsOrPhrases?.length > 0) {
            store.dispatch(loadWords(model.language.wordsOrPhrases));
          }
          if (model?.language?.dialogues && model.language.dialogues.length > 0) {
            store.dispatch(loadWordLists(model.language.dialogues));
          }
          navigate("/words");
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <main className="start-page">
      <section className="centered-container">
        <h1>Language Learn</h1>
        <button onClick={handleNewLanguageClick}>New Language</button>
      
        <label htmlFor="file-upload" className="btn">Load Language</label>
        <input
          onChange={handleFileUploadChange}
          className="start-page__file-input"
          id="file-upload"
          type="file"
        />
        
      </section>
    </main>
  )
}

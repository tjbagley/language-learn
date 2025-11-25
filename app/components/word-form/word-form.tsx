import { useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux";
import { addWord, removeWord, selectSearchQuery, selectWordById, updateWord } from "~/store/slices/words-phrases.slice";
import type { RootState } from "~/store/store";
import type { WordOrPhraseBasic } from "~/models/word-or-phrase";
import { selectAllCategories } from "~/store/slices/categories.slice";
import { removeWordFromLists } from "~/store/slices/word-lists.slice";

export interface WordFormProps {
  id?: string;
}

export function WordForm(props: WordFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialWord = useSelector((state: RootState) => selectWordById(state, props.id));
  const searchTerm = useSelector((state: RootState) => selectSearchQuery(state));
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  );

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: initialWord?.id || "",
      value: initialWord ? initialWord.value : searchTerm || "",
      soundsLike: initialWord?.soundsLike || "",
      meaning: initialWord?.meaning || "",
      categories: initialWord?.categories || [],
    },
  })
  
  const onSubmit = (data: WordOrPhraseBasic) => {
    if (initialWord?.id) {
      dispatch(updateWord(data));
    } else {
      dispatch(addWord(data));
    }
    navigate("/words");
  };

  function handleRemove(): void {
    if (initialWord?.id && confirm("Are you sure you want to remove this word/phrase?")) {
      dispatch(removeWordFromLists(initialWord.id));
      dispatch(removeWord(initialWord.id));
      navigate("/words");
    }
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("id")} />
      <div className="edit-form__row">
        <label htmlFor="value">Word or phrase</label>
        <div>
          <input id="value" {...register("value", {required: "A word or phrase is required"})} />
          <div className="form-error">{errors.value && <p>{errors.value.message}</p>}</div>
        </div>
      </div>

      <div className="edit-form__row">
        <label htmlFor="soundsLike">Sounds Like</label>
        <input id="soundsLike" {...register("soundsLike")} />
      </div>

      <div className="edit-form__row">
        <label htmlFor="meaning">Meaning</label>
        <div>
          <input id="meaning" {...register("meaning", {required: "Meaning is required"})} />
          <div className="form-error">{errors.meaning && <p>{errors.meaning.message}</p>}</div>
        </div>
      </div>

      <div className="edit-form__row">
        <label htmlFor="categories">Categories</label>
        <div>
          <select id="categories" {...register("categories", {required: "At least one category is required"})} multiple>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.description}</option>
            ))}            
          </select>
          <div className="form-error">{errors.categories && <p>{errors.categories.message}</p>}</div>
        </div>
      </div>

      <div className="edit-form__buttons">
        <input type="submit" value="Save" />
        <input type="button" value="Cancel" onClick={() => navigate("/words")} />
        {initialWord?.id && <input type="button" value="Remove" onClick={handleRemove} />}
      </div>

    </form>
  )
}

import "./list-page.scss";
import type { Route } from "../../+types/root";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import {
  addWordList,
  removeWordList,
  selectWordListById,
  updateWordList,
} from "~/store/slices/word-lists.slice";
import { selectAllWordsAndPhrases } from "~/store/slices/words-phrases.slice";
import { useFieldArray, useForm } from "react-hook-form";
import type { WordList } from "~/models/word-list";
import { Search } from "~/components/search/search";

export function meta({}: Route.MetaArgs) {
  return [{ title: "List" }, { name: "description", content: "" }];
}

export default function ListPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialWordList = useSelector((state: RootState) =>
    selectWordListById(state, id),
  );
  const words = useSelector((state: RootState) =>
    selectAllWordsAndPhrases(state),
  );

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: initialWordList?.id || "",
      description: initialWordList ? initialWordList.description : "",
      items: initialWordList?.items ? initialWordList.items : [],
    },
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (wordList: WordList) => {
    if (initialWordList?.id) {
      dispatch(updateWordList(wordList));
    } else {
      wordList.id = crypto.randomUUID();
      dispatch(addWordList(wordList));
    }
    navigate(`/list-view/${wordList.id}`);
  };

  function handleRemove(): void {
    if (
      initialWordList?.id &&
      confirm("Are you sure you want to remove this list?")
    ) {
      dispatch(removeWordList(initialWordList.id));
      navigate("/lists");
    }
  }

  const handleCancel = (): void => {
    if (initialWordList?.id) {
      navigate(`/list-view/${initialWordList.id}`);
    } else {
      navigate("/lists");
    }
  };

  function getWordOrPhraseDisplay(wordOrPhraseId: string): string {
    const wordOrPhrase = words.find((wp) => wp.id === wordOrPhraseId);
    return wordOrPhrase ? wordOrPhrase.value : "";
  }

  function handleItemAddClick(wordOrPhraseId: string): void {
    appendItem({ actor: "", wordOrPhraseId: wordOrPhraseId });
  }

  return (
    <section className="centered-container">
      <form
        className="word-list-form edit-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("id")} />
        <div className="edit-form__row">
          <label htmlFor="value">Description</label>
          <div>
            <input
              id="value"
              {...register("description", {
                required: "A description is required",
              })}
            />
            <div className="form-error">
              {errors.description && <p>{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {itemFields.map((field, index) => (
          <div key={field.id} className="word-list-form__item">
            <input
              className="word-list-form__item-actor"
              placeholder="Actor"
              {...register(`items.${index}.actor`)}
            />
            <div className="word-list-form__item-word-or-phrase">
              {getWordOrPhraseDisplay(
                getValues(`items.${index}.wordOrPhraseId`),
              )}
            </div>
            <input
              type="button"
              value="Remove"
              onClick={() => removeItem(index)}
            />
          </div>
        ))}

        <Search addClick={handleItemAddClick} />

        <div className="edit-form__buttons">
          <input type="submit" value="Save" />
          <input type="button" value="Cancel" onClick={handleCancel} />
          {initialWordList?.id && (
            <input type="button" value="Remove" onClick={handleRemove} />
          )}
        </div>
      </form>
    </section>
  );
}

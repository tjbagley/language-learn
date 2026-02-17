import { useDispatch, useSelector } from "react-redux";
import type { Route } from "../../+types/root";
import { useNavigate, useParams } from "react-router";
import type { RootState } from "~/store/store";
import {
  addWord,
  removeWord,
  selectSearchQuery,
  selectWordById,
  selectWordEditReturnRoute,
  updateWord,
} from "~/store/slices/words-phrases.slice";
import { selectAllCategories } from "~/store/slices/categories.slice";
import { useForm } from "react-hook-form";
import type { WordOrPhraseBasic } from "~/models/word-or-phrase";
import { removeWordFromLists } from "~/store/slices/word-lists.slice";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Word or Phrase" }, { name: "description", content: "" }];
}

export default function WordPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialWord = useSelector((state: RootState) =>
    selectWordById(state, id),
  );
  const searchTerm = useSelector((state: RootState) =>
    selectSearchQuery(state),
  );
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state),
  );
  const wordEditReturnRoute = useSelector((state: RootState) =>
    selectWordEditReturnRoute(state),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: initialWord?.id || "",
      value: initialWord ? initialWord.value : searchTerm || "",
      soundsLike: initialWord?.soundsLike || "",
      meaning: initialWord?.meaning || "",
      categories: initialWord?.categories || [],
    },
  });

  const onSubmit = (data: WordOrPhraseBasic) => {
    if (initialWord?.id) {
      dispatch(updateWord(data));
    } else {
      dispatch(addWord(data));
    }
    navigateBack();
  };

  const handleRemove = (): void => {
    if (
      initialWord?.id &&
      confirm("Are you sure you want to remove this word/phrase?")
    ) {
      dispatch(removeWordFromLists(initialWord.id));
      dispatch(removeWord(initialWord.id));
      navigateBack();
    }
  };

  const handleCancel = (): void => {
    navigateBack();
  };

  const navigateBack = (): void => {
    if (wordEditReturnRoute?.route) {
      if (wordEditReturnRoute?.routeId) {
        navigate(
          `/${wordEditReturnRoute.route}/${wordEditReturnRoute.routeId}`,
        );
      } else {
        navigate(`/${wordEditReturnRoute.route}`);
      }
    } else {
      navigate("/words");
    }
  };

  return (
    <section className="centered-container">
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} />
        <div className="edit-form__row">
          <label htmlFor="value">Word or phrase</label>
          <div>
            <input
              id="value"
              {...register("value", {
                required: "A word or phrase is required",
              })}
            />
            <div className="form-error">
              {errors.value && <p>{errors.value.message}</p>}
            </div>
          </div>
        </div>

        <div className="edit-form__row">
          <label htmlFor="soundsLike">Sounds Like</label>
          <input id="soundsLike" {...register("soundsLike")} />
        </div>

        <div className="edit-form__row">
          <label htmlFor="meaning">Meaning</label>
          <div>
            <input
              id="meaning"
              {...register("meaning", { required: "Meaning is required" })}
            />
            <div className="form-error">
              {errors.meaning && <p>{errors.meaning.message}</p>}
            </div>
          </div>
        </div>

        <div className="edit-form__row">
          <label htmlFor="categories">Categories</label>
          <div>
            <select
              id="categories"
              {...register("categories", {
                required: "At least one category is required",
              })}
              multiple
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </select>
            <div className="form-error">
              {errors.categories && <p>{errors.categories.message}</p>}
            </div>
          </div>
        </div>

        <div className="edit-form__buttons">
          <input type="submit" value="Save" />
          <input type="button" value="Cancel" onClick={handleCancel} />
          {initialWord?.id && (
            <input type="button" value="Remove" onClick={handleRemove} />
          )}
        </div>
      </form>
    </section>
  );
}

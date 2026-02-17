import { useDispatch, useSelector } from "react-redux";
import type { Route } from "../../+types/root";
import { useNavigate, useParams } from "react-router";
import type { RootState } from "~/store/store";
import {
  addCategory,
  removeCategory,
  selectCategoryById,
  updateCategory,
} from "~/store/slices/categories.slice";
import { useForm } from "react-hook-form";
import type { Category } from "~/models/category";
import { removeCategoryFromWords } from "~/store/slices/words-phrases.slice";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Category" }, { name: "description", content: "" }];
}

export default function CategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialCategory = useSelector((state: RootState) =>
    selectCategoryById(state, id),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: initialCategory?.id || "",
      description: initialCategory ? initialCategory.description : "",
    },
  });

  const onSubmit = (data: Category) => {
    if (initialCategory?.id) {
      dispatch(updateCategory(data));
    } else {
      data.id = crypto.randomUUID();
      dispatch(addCategory(data));
    }
    navigate(`/category-view/${data.id}`);
  };

  const handleRemove = (): void => {
    if (
      initialCategory?.id &&
      confirm("Are you sure you want to remove this category?")
    ) {
      dispatch(removeCategoryFromWords(initialCategory.id));
      dispatch(removeCategory(initialCategory.id));
      navigate("/categories");
    }
  };

  const handleCancel = (): void => {
    if (initialCategory?.id) {
      navigate(`/category-view/${initialCategory.id}`);
    } else {
      navigate("/categories");
    }
  };

  return (
    <section className="centered-container">
      <form
        className="category-form edit-form"
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

        <div className="edit-form__buttons">
          <input type="submit" value="Save" />
          <input type="button" value="Cancel" onClick={handleCancel} />
          {initialCategory?.id && (
            <input type="button" value="Remove" onClick={handleRemove} />
          )}
        </div>
      </form>
    </section>
  );
}

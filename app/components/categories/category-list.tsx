import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAllCategories } from "~/store/slices/categories.slice";
import type { RootState } from "~/store/store";
import { SectionHeader } from "../common/section-header/section-header";

export function CategoryList() {
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  );

  const handleAddClick = () => {
    navigate("/categories/new");
  }

  const handleCategoryClick = (id: string) => {
    navigate(`/category-view/${id}`);
  }

  return (
    <React.Fragment>   
      <SectionHeader heading="Categories" buttonLabel="Add" onButtonClick={handleAddClick} />
      <ul>{categories.map((item, index) => (
        <li key={index} onClick={() => handleCategoryClick(item.id)}>{item.description}</li>
      ))}</ul>
    </React.Fragment>
  );
}
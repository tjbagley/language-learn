import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAllCategories } from "~/store/slices/categories.slice";
import type { RootState } from "~/store/store";

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
      <div className="list-header">
        <h1>Categories</h1>
        <button onClick={handleAddClick} type="button">Add</button>
      </div>    
      <ul>{categories.map((item, index) => (
        <li key={index} onClick={() => handleCategoryClick(item.id)}>{item.description}</li>
      ))}</ul>
    </React.Fragment>
  );
}
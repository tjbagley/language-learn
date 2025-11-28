import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAllWordLists } from "~/store/slices/word-lists.slice";
import type { RootState } from "~/store/store";

export function WordLists() {
  const navigate = useNavigate();
  const lists = useSelector((state: RootState) =>
    selectAllWordLists(state)
  );

  const handleAddClick = () => {
    navigate("/lists/new");
  }

  const handleListClick = (id: string) => {
    navigate(`/list-view/${id}`);
  }

  return (
    <React.Fragment>    
      <div className="list-header">
        <h1>Lists</h1>
        <button onClick={handleAddClick} type="button">Add</button>
      </div>    
      <ul>{lists.map((item, index) => (
        <li key={index} onClick={() => handleListClick(item.id)}>{item.description}</li>
      ))}</ul>
    </React.Fragment>
  );
}
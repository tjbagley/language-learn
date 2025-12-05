import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAllWordLists } from "~/store/slices/word-lists.slice";
import type { RootState } from "~/store/store";
import { SectionHeader } from "../common/section-header/section-header";

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
      <SectionHeader heading="Lists" buttonLabel="Add" onButtonClick={handleAddClick} />
      <ul>{lists.map((item, index) => (
        <li key={index} onClick={() => handleListClick(item.id)}>{item.description}</li>
      ))}</ul>
    </React.Fragment>
  );
}
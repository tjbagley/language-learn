import { Outlet } from "react-router";

function EditLayout() {
  return (
    <div>
      <main className="edit-layout">
        <Outlet />
      </main>
    </div>
  );
}

export default EditLayout;
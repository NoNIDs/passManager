import { createContext } from "react";

function noop() {}

export const DashboardContext = createContext({
  count: 0,
  currentItem: null,
  editStatus: false,
  createStatus: false,
  handleEdit: noop,
  handleCreate: noop,
  handleSetCurrentItem: noop,
  setViewStatus: noop,
  handleSortValue: noop,
  onCreate: noop,
  onEdit: noop,
  onDelete: noop,
});

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { IGenre } from "../../utils/type";

export const getColumnDefs = (
  gridRef: React.MutableRefObject<any>,
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
  hookForm: UseFormReturn<IGenre, any, undefined>
) => {
  const handleEdit = () => {
    setOpenModalEdit(true);
    setTimeout(() => {
      hookForm.setFocus("name");
    }, 10);
  };
  return [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      flex: 0,
      cellClass: "align-right",
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 150,
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      flex: 0,
      sortable: false,
      cellRenderer: (e: any) => {
        return (
          <div className="cell-action">
            <Tooltip title="Sửa" arrow>
              <EditFilled
                className="cell-action__btn btn-edit"
                onClick={handleEdit}
              />
            </Tooltip>

            <Tooltip title="Xoá" arrow>
              <DeleteFilled
                className="cell-action__btn btn-delete"
                onClick={() => setOpenModalDelete(true)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
};

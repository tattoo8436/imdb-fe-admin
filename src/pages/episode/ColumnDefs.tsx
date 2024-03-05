import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import ImageDefault from "../../assets/images/user-default.png";
import { DEFAULT_FORMAT_DATE } from "../../utils/constant";
import { IEpisode } from "../../utils/type";

export const getColumnDefs = (
  gridRef: React.MutableRefObject<any>,
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
  listEpisodes: IEpisode[]
) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      flex: 0,
      cellClass: "align-right",
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "image",
      headerName: "Ảnh",
      width: 150,
      flex: 0,
      autoHeight: true,
      sortable: false,
      cellClass: "align-center",
      cellRenderer: (e: any) => {
        return (
          <img
            src={e.value ?? ImageDefault}
            alt="Ảnh"
            className="cell-image cell-image__movie"
          />
        );
      },
    },
    {
      field: "ep",
      headerName: "Tập",
      width: 100,
      flex: 0,
      cellRenderer: (e: any) => {
        return e.value ?? "";
      },
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 200,
      flex: 0.5,
      cellRenderer: (e: any) => {
        return (
          <Tooltip title={e.value ?? ""} arrow>
            <div>{e.value ?? ""}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "description",
      headerName: "Nội dung",
      minWidth: 200,
      cellRenderer: (e: any) => {
        return (
          <Tooltip title={e.value ?? ""} arrow>
            <div>{e.value ?? ""}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "releaseDate",
      headerName: "Ngày phát hành",
      minWidth: 120,
      cellClass: "align-center",
      cellRenderer: (e: any) => {
        return e.value ? dayjs(e.value).format(DEFAULT_FORMAT_DATE) : "";
      },
    },
    {
      field: "duration",
      headerName: "Thời lượng",
      minWidth: 120,
      cellRenderer: (e: any) => {
        return e.value ? `${e.value} phút` : "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      flex: 0,
      pinned: "right",
      sortable: false,
      cellRenderer: (e: any) => {
        //console.log(e);
        return (
          <div className="cell-action">
            <Tooltip title="Sửa" arrow>
              <EditFilled
                className="cell-action__btn btn-edit"
                onClick={() => setOpenModalEdit(true)}
              />
            </Tooltip>

            {e.rowIndex === listEpisodes.length - 1 && (
              <Tooltip title="Xoá" arrow>
                <DeleteFilled
                  className="cell-action__btn btn-delete"
                  onClick={() => setOpenModalDelete(true)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];
};

import {
  DeleteFilled,
  EditFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Row, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import ImageDefault from "../../assets/images/user-default.png";
import { DEFAULT_FORMAT_DATE, optionLanguageEdit } from "../../utils/constant";
import { IMovie } from "../../utils/type";

export const getColumnDefs = (
  gridRef: React.MutableRefObject<any>,
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: any,
  hookForm: UseFormReturn<IMovie, any, undefined>
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
      field: "name",
      headerName: "Tên",
      minWidth: 150,
      flex: 0.3,
      wrapText: true,
      autoHeight: true,
      cellRenderer: (e: any) => {
        return (
          <Tooltip title={e.value ?? ""} arrow>
            <div>{e.value ?? ""}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "type",
      headerName: "Loại phim",
      width: 100,
      flex: 0,
      cellRenderer: (e: any) => {
        return e.value === 1 ? "Phim lẻ" : "Phim bộ";
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
      field: "movieGenres",
      headerName: "Thể loại",
      minWidth: 150,
      autoHeight: true,
      sortable: false,
      cellRenderer: (e: any) => {
        return (
          <Row className="cell-tag" gutter={[10, 10]}>
            {e.value?.map((i: any) => (
              <Col span={24} key={i.genre.id}>
                <span className="cell-tag__item">{i.genre.name}</span>
              </Col>
            ))}
          </Row>
        );
      },
    },
    {
      field: "movieActors",
      headerName: "Diễn viên",
      minWidth: 300,
      autoHeight: true,
      wrapText: true,
      sortable: false,
      cellRenderer: (e: any) => {
        return (
          <Row className="cell-tag" gutter={[6, 6]}>
            {e.value?.map((i: any) => (
              <Col span={24} key={i.actor.id}>
                <span className="cell-tag__item item-person">
                  <Avatar
                    src={i.actor.image ?? ImageDefault}
                    alt="Ảnh"
                    className="cell-tag__item__image"
                  />

                  <span className="cell-tag__item__text">
                    <span className="cell-tag__item__text__name">
                      {i.actor.name}
                    </span>
                    <span className="cell-tag__item__text__normal"> vai </span>
                    <span className="cell-tag__item__text__name">
                      {i.nameInMovie}
                    </span>
                  </span>
                </span>
              </Col>
            ))}
          </Row>
        );
      },
    },
    {
      field: "movieDirectors",
      headerName: "Đạo diễn",
      minWidth: 200,
      cellRenderer: (e: any) => {
        return (
          <Row className="cell-tag" gutter={[6, 6]}>
            {e.value?.map((i: any) => (
              <Col span={24} key={i.director.id}>
                <span className="cell-tag__item item-person">
                  <Avatar
                    src={i.director.image ?? ImageDefault}
                    alt="Ảnh"
                    className="cell-tag__item__image"
                  />

                  <span className="cell-tag__item__text">
                    <span className="cell-tag__item__text__name">
                      {i.director.name}
                    </span>
                  </span>
                </span>
              </Col>
            ))}
          </Row>
        );
      },
    },
    {
      field: "releaseDate",
      headerName: "Ngày phát hành",
      width: 120,
      flex: 0,
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
      field: "language",
      headerName: "Ngôn ngữ",
      minWidth: 120,
      cellRenderer: (e: any) => {
        return optionLanguageEdit?.find((i) => i.value === e.value)?.label;
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      flex: 0,
      pinned: "right",
      sortable: false,
      cellClass: "cell-action-wrapper",
      cellRenderer: (e: any) => {
        //console.log(e);
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

            {e.data.type === 2 ? (
              <Tooltip title="Danh sách tập" arrow>
                <UnorderedListOutlined
                  className="cell-action__btn btn-common"
                  onClick={() =>
                    navigate(`/movie/episode?movieId=${e.data.id}`)
                  }
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  ];
};

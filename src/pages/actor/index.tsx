import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getColumnDefs } from "./ColumnDefs";
import { actorApi } from "../../apis/actorApi";
import SearchBar from "./SearchBar";
import { IActor, ISearchActor } from "../../utils/type";
import { getCurrentAccount } from "../../utils";
import TableFooter from "../../components/TableFooter";
import ModalDelete from "../../components/ModalDelete";
import { toast } from "react-toastify";
import ModalAdd from "./ModalAdd";
import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { DEFAULT_ACTOR } from "../../utils/defaultValue";
import ModalEdit from "./ModalEdit";
import { DEFAULT_SEARCH } from "../../utils/defaultValue";

const Actor = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormActor = useForm({
    defaultValues: DEFAULT_ACTOR,
    mode: "onChange",
  });

  const [listActors, setListActors] = useState({
    loading: false,
    data: [],
    error: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchActor>(DEFAULT_SEARCH);
  const [totalRecords, setTotalRecords] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowSelected, setRowSelected] = useState<any>(null);

  const defaultColDef: any = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      editable: false,
      flex: 1,
      suppressMenu: true,
      comparator: () => {
        return;
      },
    }),
    []
  );

  const columnDefs: any = getColumnDefs(
    gridRef,
    setOpenModalDelete,
    setOpenModalEdit,
    hookFormActor
  );

  useEffect(() => {
    fetchActor();
  }, [isRefetch, search]);

  const fetchActor = async () => {
    setTimeout(() => {
      gridRef.current?.api?.showLoadingOverlay();
    }, 10);
    setListActors((pre) => ({ ...pre, loading: false }));
    try {
      const { data } = await actorApi.searchActor(search);
      console.log({ data });
      setTotalRecords(data?.totals);
      setListActors({
        loading: false,
        data: data?.data,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setListActors({
        loading: false,
        data: [],
        error,
      });
    }
  };

  const onSortChanged = (e: any) => {
    const column = e.columnApi
      .getColumnState()
      .find((e: any) => e.sort !== null);
    if (column !== undefined) {
      setSearch({
        ...search,
        sortBy: column.colId,
        orderBy: column.sort === "asc" ? "ASC" : "DESC",
      });
    } else {
      setSearch({
        ...search,
        sortBy: null,
        orderBy: null,
      });
    }
  };

  const onCancelDelete = () => {
    setOpenModalDelete(false);
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const { data } = await actorApi.deleteActor(rowSelected?.id);
      console.log({ data });
      setLoading(false);
      setOpenModalDelete(false);
      setIsRefetch((pre) => !pre);
      toast.success("Xoá thành công!", { autoClose: 3000 });
    } catch (error) {
      toast.error("Xoá thất bại!", { autoClose: 3000 });
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setOpenModalAdd(true);
    setTimeout(() => {
      hookFormActor.setFocus("name");
    }, 10);
  };

  return (
    <div className="actor">
      <div className="actor__title">Quản lý diễn viên</div>

      <Row justify="space-between">
        <Col span={4}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm
          </Button>
        </Col>

        <Col span={20}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            setIsRefetch={setIsRefetch}
          />
        </Col>
      </Row>

      <div
        className="ag-theme-alpine actor__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listActors.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellClicked={(e) => {
            console.log(e);
            setRowSelected(e.data);
          }}
          rowSelection={"single"}
          localeText={{ noRowsToShow: "Không có dữ liệu" }}
          onSortChanged={onSortChanged}
          overlayLoadingTemplate="<span class='loader'></span>"
        />
      </div>

      <TableFooter
        pageIndex={search.page}
        pageSize={search.limit}
        totalRecords={totalRecords}
        setSearch={setSearch}
        setIsRefetch={setIsRefetch}
      />

      <ModalDelete
        openModal={openModalDelete}
        loading={loading}
        onCancel={onCancelDelete}
        onDelete={onDelete}
      />

      <ModalAdd
        hookForm={hookFormActor}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
      />

      <ModalEdit
        hookForm={hookFormActor}
        actor={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
      />
    </div>
  );
};

export default Actor;

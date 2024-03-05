import { PlusOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { directorApi } from "../../apis/directorApi";
import ModalDelete from "../../components/ModalDelete";
import TableFooter from "../../components/TableFooter";
import { getCurrentAccount } from "../../utils";
import { DEFAULT_DIRECTOR, DEFAULT_SEARCH } from "../../utils/defaultValue";
import { ISearchDirector } from "../../utils/type";
import { getColumnDefs } from "./ColumnDefs";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import SearchBar from "./SearchBar";

const Director = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormDirector = useForm({
    defaultValues: DEFAULT_DIRECTOR,
    mode: "onChange",
  });

  const [listDirectors, setListDirectors] = useState({
    loading: false,
    data: [],
    error: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchDirector>(DEFAULT_SEARCH);
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
    hookFormDirector
  );

  useEffect(() => {
    fetchDirector();
  }, [isRefetch, search]);

  const fetchDirector = async () => {
    setTimeout(() => {
      gridRef.current?.api?.showLoadingOverlay();
    }, 10);
    setListDirectors((pre) => ({ ...pre, loading: false }));
    try {
      const { data } = await directorApi.searchDirector(search);
      console.log({ data });
      setTotalRecords(data?.totals);
      setListDirectors({
        loading: false,
        data: data?.data,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      setListDirectors({
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
      const { data } = await directorApi.deleteDirector(rowSelected?.id);
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
      hookFormDirector.setFocus("name");
    }, 10);
  };

  return (
    <div className="director">
      <div className="director__title">Quản lý đạo diễn</div>

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
        className="ag-theme-alpine director__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listDirectors.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellClicked={(e) => setRowSelected(e.data)}
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
        hookForm={hookFormDirector}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
      />

      <ModalEdit
        hookForm={hookFormDirector}
        director={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
      />
    </div>
  );
};

export default Director;

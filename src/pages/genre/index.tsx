import { PlusOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Button, Col, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { genreApi } from "../../apis/genreApi";
import ModalDelete from "../../components/ModalDelete";
import TableFooter from "../../components/TableFooter";
import { getCurrentAccount } from "../../utils";
import { DEFAULT_GENRE, DEFAULT_SEARCH } from "../../utils/defaultValue";
import { IDataSync, ISearchGenre } from "../../utils/type";
import { getColumnDefs } from "./ColumnDefs";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import SearchBar from "./SearchBar";

const Genre = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormGenre = useForm({
    defaultValues: DEFAULT_GENRE,
    mode: "onChange",
  });

  const [listGenres, setListGenres] = useState<IDataSync>({
    loading: false,
    data: [],
    error: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchGenre>({
    ...DEFAULT_SEARCH,
    name: "",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [rowSelected, setRowSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
    hookFormGenre
  );

  useEffect(() => {
    fetchGenre();
  }, [isRefetch, search]);

  const fetchGenre = async () => {
    setTimeout(() => {
      gridRef.current?.api?.showLoadingOverlay();
    }, 10);
    setListGenres((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await genreApi.searchGenre(search);
      console.log({ data });
      setTotalRecords(data?.totals);
      setListGenres({
        loading: false,
        data: data?.data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setListGenres({
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
      const { data } = await genreApi.deleteGenre(rowSelected?.id);
      console.log({ data });
      setOpenModalDelete(false);
      setIsRefetch((pre) => !pre);
      toast.success("Xoá thành công!", { autoClose: 3000 });
      setLoading(false);
    } catch (error) {
      toast.error("Xoá thất bại!", { autoClose: 3000 });
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setOpenModalAdd(true);
    setTimeout(() => {
      hookFormGenre.setFocus("name");
    }, 10);
  };

  return (
    <div className="genre">
      <div className="genre__title">Quản lý thể loại</div>

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
        className="ag-theme-alpine genre__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listGenres.data}
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
        hookForm={hookFormGenre}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
      />

      <ModalEdit
        hookForm={hookFormGenre}
        genre={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
      />
    </div>
  );
};

export default Genre;

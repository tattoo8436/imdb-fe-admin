import { PlusOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Avatar, Button, Col, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actorApi } from "../../apis/actorApi";
import { directorApi } from "../../apis/directorApi";
import { genreApi } from "../../apis/genreApi";
import { movieApi } from "../../apis/movieApi";
import ImageDefault from "../../assets/images/user-default.png";
import ModalDelete from "../../components/ModalDelete";
import TableFooter from "../../components/TableFooter";
import { getCurrentAccount } from "../../utils";
import { DEFAULT_MOVIE } from "../../utils/defaultValue";
import { IActor, IDirector, IGenre, ISearchMovie } from "../../utils/type";
import { getColumnDefs } from "./ColumnDefs";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import SearchBar from "./SearchBar";

const Movie = () => {
  const gridRef: any = useRef(null);
  const account = getCurrentAccount();
  const hookFormMovie = useForm({
    defaultValues: DEFAULT_MOVIE,
    mode: "onChange",
  });
  const hookFieldActor = useFieldArray({
    name: "listActors",
    control: hookFormMovie.control,
  });
  const navigate = useNavigate();

  const [listMovies, setListMovies] = useState({
    loading: false,
    data: [],
    error: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [search, setSearch] = useState<ISearchMovie>({
    page: 1,
    limit: 10,
    name: "",
    genreId: null,
    type: null,
    score: null,
    releaseDate: null,
    language: null,
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listGenres, setListGenres] = useState([]);
  const [listActors, setListActors] = useState([]);
  const [listDirectors, setListDirectors] = useState([]);
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
    navigate,
    hookFormMovie
  );

  useEffect(() => {
    fetchMovie();
  }, [isRefetch, search]);

  useEffect(() => {
    fetchAllGenres();
    fetchAllActors();
    fetchAllDirectors();
  }, []);

  const fetchMovie = async () => {
    setTimeout(() => {
      gridRef.current?.api?.showLoadingOverlay();
    }, 0);
    setListMovies((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.searchMovie({
        ...search,
        releaseDate: search.releaseDate ? `${search.releaseDate}-01-01` : null,
      });
      console.log({ data });
      setTotalRecords(data?.totals);
      setListMovies({
        loading: false,
        data: data?.data,
        error: null,
      });
      gridRef.current?.api?.hideOverlay();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGenres = async () => {
    try {
      const { data } = await genreApi.searchGenre({
        page: 1,
        limit: 999999,
      });
      console.log({ data });
      setListGenres(
        data.data?.map((i: IGenre) => ({ label: i.name, value: i.id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllActors = async () => {
    try {
      const { data } = await actorApi.searchActor({
        page: 1,
        limit: 999999,
      });
      console.log({ data });
      setListActors(
        data.data?.map((i: IActor) => ({
          label: (
            <div className="option-person">
              <Avatar
                src={i.image ?? ImageDefault}
                alt="Ảnh"
                className="option-person__image"
              />
              <div className="option-person__name">{i.name}</div>
            </div>
          ),
          value: i.id,
          labelText: i.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllDirectors = async () => {
    try {
      const { data } = await directorApi.searchDirector({
        page: 1,
        limit: 999999,
      });
      console.log({ data });
      setListDirectors(
        data.data?.map((i: IDirector) => ({
          label: (
            <div className="option-person">
              <Avatar
                src={i.image ?? ImageDefault}
                alt="Ảnh"
                className="option-person__image"
              />
              <div className="option-person__name">{i.name}</div>
            </div>
          ),
          value: i.id,
          labelText: i.name,
        }))
      );
    } catch (error) {
      console.log(error);
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
      const { data } = await movieApi.deleteMovie(rowSelected?.id);
      console.log({ data });
      setLoading(false);
      setOpenModalDelete(false);
      setIsRefetch((pre) => !pre);
      toast.success("Xoá thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setOpenModalAdd(true);
    setTimeout(() => {
      hookFormMovie.setValue("listActors", [{ id: null, nameInMovie: "" }]);
      hookFormMovie.setFocus("name");
    }, 10);
  };

  return (
    <div className="movie">
      <div className="movie__title">Quản lý phim</div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        setIsRefetch={setIsRefetch}
        listGenres={listGenres}
      />

      <Row>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm
          </Button>
        </Col>
      </Row>

      <div
        className="ag-theme-alpine movie__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listMovies.data}
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
        hookForm={hookFormMovie}
        hookFieldActor={hookFieldActor}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
        listGenres={listGenres}
        listActors={listActors}
        listDirectors={listDirectors}
      />

      <ModalEdit
        hookForm={hookFormMovie}
        hookFieldActor={hookFieldActor}
        movie={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
        listGenres={listGenres}
        listActors={listActors}
        listDirectors={listDirectors}
      />
    </div>
  );
};

export default Movie;

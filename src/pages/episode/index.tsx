import { AgGridReact } from "ag-grid-react";
import { Button, Select, Space, Spin, Tooltip } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { episodeApi } from "../../apis/episodeApi";
import { movieApi } from "../../apis/movieApi";
import ModalDelete from "../../components/ModalDelete";
import { getCurrentAccount } from "../../utils";
import { DEFAULT_EPISODE } from "../../utils/defaultValue";
import { IEpisode, IMovie } from "../../utils/type";
import { getColumnDefs } from "./ColumnDefs";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const Episode = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");
  const account = getCurrentAccount();
  const gridRef: any = useRef(null);
  const hookFormEpisode = useForm({
    defaultValues: DEFAULT_EPISODE,
    mode: "onChange",
  });

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [listEpisodes, setListEpisodes] = useState<Array<IEpisode>>([]);
  const [season, setSeason] = useState(1);
  const [listSeason, setListSeason] = useState<any>([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [isRefetch]);

  const defaultColDef: any = useMemo(
    () => ({
      sortable: false,
      resizable: true,
      editable: false,
      flex: 1,
      suppressMenu: true,
    }),
    []
  );

  const columnDefs: any = getColumnDefs(
    gridRef,
    setOpenModalDelete,
    setOpenModalEdit,
    listEpisodes
  );

  const fetchMovie = async () => {
    setTimeout(() => {
      gridRef.current?.api?.showLoadingOverlay();
    }, 10);
    try {
      const { data } = await movieApi.getMovieById(movieId);
      console.log({ data });
      // setListSeason(
      //   Array.from({ length: data?.numberSeason }, (_, index) => index + 1)
      // );
      setListSeason(
        Array.from({ length: data?.numberSeason }).map((_, index) => ({
          label: `Mùa ${index + 1}`,
          value: index + 1,
        }))
      );
      setListEpisodes(
        data?.episodes
          ?.filter((i: any) => i.season === season)
          ?.sort((a: any, b: any) => a.id - b.id)
      );
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelDelete = () => {
    setOpenModalDelete(false);
  };

  const onDelete = async () => {
    setLoadingDelete(true);
    const rowSelected = gridRef?.current?.api?.getDisplayedRowAtIndex(
      gridRef?.current?.api?.getFocusedCell().rowIndex
    );
    console.log(rowSelected);
    try {
      const { data } = await episodeApi.deleteEpisode(rowSelected.data.id);
      console.log({ data });
      setLoadingDelete(false);
      setOpenModalDelete(false);
      setIsRefetch((pre) => !pre);
      toast.success("Xoá thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  };

  const handleAddSeason = async () => {
    setLoading(true);
    try {
      const { data } = await movieApi.addSeason(movieId);
      console.log({ data });
      setLoading(false);
      setIsRefetch((pre) => !pre);
      toast.success("Thêm thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChangeSeason = (e: any) => {
    setSeason(e);
    setIsRefetch((pre) => !pre);
  };

  return (
    <div className="episode">
      <div className="episode__title">{movie?.name}</div>

      <div className="episode__toolbar">
        <div className="episode__season">
          <Select
            options={listSeason}
            value={season}
            onChange={handleChangeSeason}
            className="episode__season__select"
          />

          <Tooltip arrow title="Thêm mùa">
            <Button
              type="link"
              icon={
                !loading ? (
                  <PlusOutlined />
                ) : (
                  <Spin indicator={<LoadingOutlined spin />} />
                )
              }
              className="episode__season__btn"
              onClick={handleAddSeason}
              disabled={loading}
            ></Button>
          </Tooltip>
        </div>

        <div className="episode__btn">
          <Button
            className="episode__btn__item"
            type="primary"
            onClick={() => setOpenModalAdd(true)}
          >
            Thêm tập
          </Button>
          {/* 
        <Button
          className="episode__btn__item"
          type="primary"
          onClick={() => handleAddSeason()}
          loading={loading}
        >
          Thêm mùa
        </Button> */}

          {/* <Button className="episode__btn__item" type="primary" danger>
          Kết thúc
        </Button> */}
        </div>
      </div>

      <div
        className="ag-theme-alpine episode__table"
        style={{ width: "100%", height: "450px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={listEpisodes}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellClicked={(e) => console.log(e)}
          rowSelection={"single"}
          localeText={{ noRowsToShow: "Không có dữ liệu" }}
          overlayLoadingTemplate="<span class='loader'></span>"
        />
      </div>

      <ModalDelete
        openModal={openModalDelete}
        loading={loadingDelete}
        onCancel={onCancelDelete}
        onDelete={onDelete}
      />

      <ModalAdd
        hookForm={hookFormEpisode}
        openModal={openModalAdd}
        setOpenModal={setOpenModalAdd}
        setIsRefetch={setIsRefetch}
        account={account}
        listEpisodes={listEpisodes}
        season={season}
        movieId={movieId}
      />

      <ModalEdit
        hookForm={hookFormEpisode}
        episode={gridRef?.current?.api?.getSelectedRows()[0]}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        setIsRefetch={setIsRefetch}
        account={account}
        movieId={movieId}
      />
    </div>
  );
};

export default Episode;

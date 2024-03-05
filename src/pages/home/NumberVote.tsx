import { StarFilled } from "@ant-design/icons";
import { Badge, Button, Col, Row, Skeleton } from "antd";
import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { movieApi } from "../../apis/movieApi";
import { IMovie, IMovieStatistic } from "../../utils/type";
import ModalNumberVote from "./ModalNumberVote";
import ImageDefault from "../../utils/constant";

const NumberVote = () => {
  const [listMovies, setListMovies] = useState({
    loading: false,
    data: [],
    error: null,
  });
  const [openModalNumberVote, setOpenModalNumberVote] = useState(false);
  const [movie, setMovie] = useState<IMovieStatistic | null>(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    setListMovies((pre) => ({ ...pre, loading: true }));
    try {
      const { data } = await movieApi.searchMovie({
        pageIndex: 1,
        pageSize: 10,
        name: "",
        type: null,
        genreId: null,
        score: null,
        numberVote: 1,
        releaseDate: null,
        language: null,
        sortBy: "numberVote",
        orderBy: "DESC",
      });
      console.log({ data });
      setListMovies({
        loading: false,
        data: data?.data,
        error: null,
      });
    } catch (error: any) {
      setListMovies({
        loading: false,
        data: [],
        error,
      });
      console.log(error);
    }
  };

  const handleOpenModalNumberVote = async (movie: IMovie) => {
    setOpenModalNumberVote(true);
    setMovie({
      id: movie.id ?? 0,
      name: movie.name,
      listNumberVotes: null,
    });
    try {
      const { data } = await movieApi.getStatisticMovie(movie.id);
      console.log(data);
      setMovie({
        id: movie.id ?? 0,
        name: movie.name,
        listNumberVotes: data.reverse(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="number-vote">
      <Row gutter={[24, 24]}>
        {listMovies.loading
          ? Array.from({ length: 10 }, () => 0).map((i, index) => (
              <div className="loading-overlay" key={index}>
                <Skeleton.Image active className="loading-overlay__image" />
                <Skeleton
                  active
                  className="loading-overlay__text"
                  paragraph={{ rows: 2 }}
                />
              </div>
            ))
          : listMovies.data?.map((movie: IMovie, index) => (
              <Col span={24} key={movie.id}>
                <div className="movie-item card-hover">
                  <Badge.Ribbon text={`Hạng ${index + 1}`}>
                    <img
                      className="movie-item__image"
                      src={movie.image ?? ImageDefault}
                      alt="Ảnh"
                    />
                  </Badge.Ribbon>

                  <div className="movie-item__detail">
                    <div className="movie-item__detail__name">
                      {movie.name}{" "}
                      {movie.releaseDate
                        ? `(${dayjs(movie.releaseDate).format("YYYY")})`
                        : ""}
                    </div>

                    <div className="movie-item__detail__score">
                      <StarFilled />
                      {movie.score?.toFixed(1)}
                    </div>

                    <div className="movie-item__detail__number-vote">
                      Số lượt đánh giá:{" "}
                      <strong>{numeral(movie.numberVote).format("0,")}</strong>
                    </div>
                  </div>

                  <div className="overlay">
                    <Button
                      type="primary"
                      className="overlay__btn"
                      onClick={() => handleOpenModalNumberVote(movie)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
      </Row>

      <ModalNumberVote
        openModal={openModalNumberVote}
        setOpenModal={setOpenModalNumberVote}
        movie={movie}
      />
    </div>
  );
};

export default NumberVote;

import { StarFilled } from "@ant-design/icons";
import { Badge, Col, Row } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { movieApi } from "../../apis/movieApi";
import ImageDefault from "../../utils/constant";
import { IMovie } from "../../utils/type";

const Trending = () => {
  const [listMovies, setListMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    setListMovies([]);
    try {
      const { data } = await movieApi.getTrendingMovie();
      const counts = _.countBy(data);
      const countsArray = _.map(counts, (count, num) => ({
        movieId: parseInt(num),
        count,
      }));
      const sortedCounts = _.orderBy(countsArray, ["count"], ["desc"]);
      console.log(sortedCounts);

      for (let i = 0; i < Math.min(10, sortedCounts.length); i++) {
        const dataMovie = await movieApi.getMovieById(sortedCounts[i].movieId);
        setListMovies((pre) => [
          ...pre,
          { ...dataMovie.data, numberLastVote: sortedCounts[i].count },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="trending">
      <Row gutter={[24, 24]}>
        {listMovies?.map((movie: IMovie, index) => (
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

                <div className="movie-item__detail__number-vote d-none">
                  Tổng số lượt đánh giá:{" "}
                  <strong>{numeral(movie.numberVote).format("0,")}</strong>
                </div>

                <div className="movie-item__detail__number-vote-new">
                  Số lượt đánh giá 7 ngày gần nhất:{" "}
                  <strong>{numeral(movie.numberLastVote).format("0,")}</strong>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Trending;

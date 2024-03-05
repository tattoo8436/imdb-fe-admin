import { Modal, Spin } from "antd";
import React from "react";
import { IMovieStatistic } from "../../utils/type";
import ReactApexChart from "react-apexcharts";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  movie: IMovieStatistic | null;
}

const ModalNumberVote = (props: IProps) => {
  const { openModal, setOpenModal, movie } = props;

  const onClose = () => {
    setOpenModal(false);
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      offsetX: 0,
    },
    xaxis: {
      categories: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  console.log(movie);

  return (
    <Modal
      open={openModal}
      onCancel={onClose}
      centered
      className="modal"
      footer={null}
    >
      <div className="modal__header">{movie?.name}</div>

      <div
        className="modal__content"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {movie?.listNumberVotes ? (
          <div style={{ width: "100%" }}>
            <ReactApexChart
              type="bar"
              height={350}
              options={options}
              series={[{ data: movie?.listNumberVotes ?? [] }]}
            />
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </Modal>
  );
};

export default ModalNumberVote;

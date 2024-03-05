import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { episodeApi } from "../../apis/episodeApi";
import { fileApi } from "../../apis/fileApi";
import { IEpisode, IOption } from "../../utils/type";
import { uploadImage } from "../../utils";

interface IProps {
  hookForm: UseFormReturn<IEpisode, any, undefined>;
  episode: IEpisode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
  movieId: string | null;
}

const ModalEdit = (props: IProps) => {
  const {
    hookForm,
    episode,
    openModal,
    setOpenModal,
    setIsRefetch,
    account,
    movieId,
  } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (episode) {
      hookForm.setValue("ep", episode.ep);
      hookForm.setValue("season", episode.season);
      hookForm.setValue("name", episode.name);
      hookForm.setValue("description", episode.description);
      hookForm.setValue(
        "image",
        episode.image ? [{ id: "1", name: episode.image }] : []
      );
      hookForm.setValue(
        "releaseDate",
        episode.releaseDate ? dayjs(episode.releaseDate, "YYYY-MM-DD") : null
      );
      hookForm.setValue("duration", episode.duration);
    }
  }, [openModal]);

  const onSubmit = async (values: IEpisode) => {
    setLoading(true);
    try {
      let imageUrl = values.image.length > 0 ? values.image[0].name : "";
      if (values.image.at(0)?.id !== "1") {
        imageUrl = await uploadImage(values.image.at(0)?.originFileObj);
      }
      const payload = {
        id: episode.id,
        season: values.season,
        name: values.name,
        description: values.description,
        image: imageUrl || null,
        releaseDate: values.releaseDate
          ? dayjs(values.releaseDate).format("YYYY-MM-DD")
          : null,
        duration: values.duration || null,
      };
      const { data } = await episodeApi.editEpisode(payload);
      console.log({ data });
      setIsRefetch((pre) => !pre);
      setLoading(false);
      onCancel();
      toast.success("Sửa thành công!", { autoClose: 3000 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onCancel = () => {
    setOpenModal(false);
    setTimeout(() => {
      hookForm.reset();
      hookForm.clearErrors();
    }, 100);
  };

  return (
    <Modal
      className="modal modal-edit"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={1000}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Sửa tập phim</div>
        <div className="modal__content">
          <Row gutter={24}>
            <Col span={12} className="form__item">
              <div className="form__item__label">
                Tập <span>*</span>
              </div>
              <Controller
                name="ep"
                control={hookForm.control}
                render={({ field }) => (
                  <Input {...field} disabled className="form__item__input" />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">
                Mùa <span>*</span>
              </div>
              <Controller
                name="season"
                control={hookForm.control}
                render={({ field }) => (
                  <Input {...field} disabled className="form__item__input" />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">
                Tên <span>*</span>
              </div>
              <Controller
                name="name"
                control={hookForm.control}
                rules={{
                  validate: {
                    required: (v) => v.trim().length > 0 || "Tên là bắt buộc",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Nhập tên"
                    className="form__item__input"
                    status={fieldState.error !== undefined ? "error" : ""}
                  />
                )}
              />
              {hookForm.formState.errors.name && (
                <p className="error-msg">
                  {hookForm.formState.errors.name.message}
                </p>
              )}
            </Col>

            <Col span={12} className="form__item item-image">
              <div className="form__item__label">Ảnh</div>
              <Controller
                name="image"
                control={hookForm.control}
                render={({ field }) => (
                  <Upload
                    {...field}
                    fileList={field.value}
                    onChange={(e) => {
                      field.onChange(e.fileList);
                    }}
                    beforeUpload={() => false}
                    multiple={false}
                    accept=".jpg,.png,.jpeg"
                  >
                    <Button
                      className={classNames({
                        "d-none": hookForm.watch("image")?.length > 0,
                      })}
                    >
                      Chọn ảnh
                    </Button>
                  </Upload>
                )}
              />
            </Col>

            <Col span={24} className="form__item form__item--text-area">
              <div className="form__item__label">Nội dung</div>
              <Controller
                name="description"
                control={hookForm.control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Nhập giới thiệu"
                    className="form__item__input"
                  />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">Ngày phát hành</div>
              <Controller
                name="releaseDate"
                control={hookForm.control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    placeholder="Chọn ngày phát hành"
                    className="form__item__input"
                    format="DD/MM/YYYY"
                  />
                )}
              />
            </Col>

            <Col span={12} className="form__item">
              <div className="form__item__label">Thời lượng (phút)</div>
              <Controller
                name="duration"
                control={hookForm.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập thời lượng"
                    className="form__item__input"
                    type="number"
                  />
                )}
              />
            </Col>
          </Row>
        </div>

        <div className="modal__footer">
          <Button className="modal__footer__item" onClick={() => onCancel()}>
            Huỷ
          </Button>

          <Button
            loading={loading}
            className="modal__footer__item"
            type="primary"
            htmlType="submit"
          >
            Lưu
          </Button>
          <Button
            className="d-none"
            onClick={() => console.log(hookForm.getValues())}
          >
            Log
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEdit;

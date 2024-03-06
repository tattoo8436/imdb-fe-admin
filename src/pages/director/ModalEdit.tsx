import { Button, Col, DatePicker, Input, Modal, Row, Upload } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { directorApi } from "../../apis/directorApi";
import { fileApi } from "../../apis/fileApi";
import { IDirector } from "../../utils/type";
import { uploadImage } from "../../utils";

interface IProps {
  hookForm: UseFormReturn<IDirector, any, undefined>;
  director: IDirector;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const ModalEdit = (props: IProps) => {
  const { hookForm, director, openModal, setOpenModal, setIsRefetch, account } =
    props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (director) {
      hookForm.setValue("name", director.name);
      hookForm.setValue("description", director.description);
      hookForm.setValue(
        "image",
        director.image ? [{ id: "1", name: director.image }] : []
      );
      hookForm.setValue(
        "dob",
        director.dob ? dayjs(director.dob, "YYYY-MM-DD") : null
      );
    }
  }, [openModal]);

  const onSubmit = async (values: IDirector) => {
    setLoading(true);
    try {
      let imageUrl = values.image.length > 0 ? values.image[0].name : "";
      if (values.image.at(0)?.id !== "1") {
        imageUrl = await uploadImage(values.image.at(0)?.originFileObj);
      }
      const payload: any = {
        id: director?.id,
        name: values.name,
        description: values.description,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : null,
        image: imageUrl || null,
      };
      console.log(payload);
      const { data } = await directorApi.editDirector(payload);
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
    }, 10);
  };

  return (
    <Modal
      className="modal modal-edit"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Sửa đạo diễn</div>
        <div className="modal__content">
          <Row>
            <Col span={24} className="form__item">
              <div className="form__item__label">
                Họ tên <span>*</span>
              </div>
              <Controller
                name="name"
                control={hookForm.control}
                rules={{
                  validate: {
                    required: (v) =>
                      v.trim().length > 0 || "Họ tên là bắt buộc",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Nhập họ tên"
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

            <Col span={24} className="form__item item-image">
              <div className="form__item__label">Ảnh</div>
              <Controller
                name="image"
                control={hookForm.control}
                render={({ field, fieldState }) => (
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
              <div className="form__item__label">Giới thiệu</div>
              <Controller
                name="description"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Nhập giới thiệu"
                    className="form__item__input"
                  />
                )}
              />
            </Col>

            <Col span={24} className="form__item">
              <div className="form__item__label">Ngày sinh</div>
              <Controller
                name="dob"
                control={hookForm.control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    placeholder="Chọn ngày sinh"
                    className="form__item__input"
                    format="DD/MM/YYYY"
                    disabledDate={(date) => {
                      return date >= dayjs();
                    }}
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

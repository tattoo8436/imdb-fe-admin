import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { genreApi } from "../../apis/genreApi";
import { IGenre } from "../../utils/type";

interface IProps {
  hookForm: UseFormReturn<IGenre, any, undefined>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const ModalAdd = (props: IProps) => {
  const { hookForm, openModal, setOpenModal, setIsRefetch, account } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: IGenre) => {
    setLoading(true);
    const payload = {
      name: value.name,
    };
    try {
      const { data } = await genreApi.addGenre(payload);
      console.log({ data });
      setIsRefetch((pre) => !pre);
      setLoading(false);
      onCancel();
      toast.success("Thêm thành công!", { autoClose: 3000 });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message, { autoClose: 3000 });
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
      className="modal modal-add"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <form onSubmit={hookForm.handleSubmit(onSubmit)} className="form">
        <div className="modal__header">Thêm thể loại</div>
        <div className="modal__content">
          <Row>
            <Col span={24} className="form__item">
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

export default ModalAdd;

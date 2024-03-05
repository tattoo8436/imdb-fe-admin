import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";

interface IProps {
  openModal: boolean;
  loading: boolean;
  onCancel: any;
  onDelete: any;
}

const ModalDelete = (props: IProps) => {
  const { openModal, loading, onCancel, onDelete } = props;

  return (
    <Modal
      className="modal modal-delete"
      open={openModal}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div className="modal__header">Xác nhận xoá</div>
      <div className="modal__content">
        <div className="modal__content__icon">
          <QuestionCircleOutlined />
        </div>

        <div className="modal__content__text">Bạn có chắc muốn xoá không?</div>
      </div>

      <div className="modal__footer">
        <Button className="modal__footer__item" onClick={() => onCancel()}>
          Huỷ
        </Button>

        <Button
          loading={loading}
          className="modal__footer__item"
          onClick={() => onDelete()}
          type="primary"
          danger
        >
          Xoá
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;

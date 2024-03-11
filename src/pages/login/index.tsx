import { VideoCameraOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accountApi } from "../../apis/accountApi";
import { IAccountLogin } from "../../utils/type";

const Login = () => {
  const hookForm = useForm({
    defaultValues: {
      username: "admintest",
      password: "123",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: IAccountLogin) => {
    setLoading(true);
    try {
      const { data } = await accountApi.login(value);
      console.log(data);
      setLoading(false);
      localStorage.setItem("account", JSON.stringify(data));
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message, { autoClose: 3000 });
    }
  };

  return (
    <div className="login">
      <div className="login__content card">
        <div className="login__content__header">
          <VideoCameraOutlined className="login__content__header__icon" />
          <div className="login__content__header__text">The Movie Database</div>
        </div>

        <form className="form" onSubmit={hookForm.handleSubmit(onSubmit)}>
          <div className="form__item">
            <div className="form__item__label">Tên đăng nhập</div>

            <Controller
              name="username"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) =>
                    v.trim().length > 0 || "Tên đăng nhập là bắt buộc",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  placeholder="Tên đăng nhập"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.username && (
              <p className="error-msg">
                {hookForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="form__item">
            <div className="form__item__label">Mật khẩu</div>

            <Controller
              name="password"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) =>
                    v.trim().length > 0 || "Mật khẩu là bắt buộc",
                },
              }}
              render={({ field, fieldState }) => (
                <Input.Password
                  {...field}
                  placeholder="Mật khẩu"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.password && (
              <p className="error-msg">
                {hookForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="form__btn">
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

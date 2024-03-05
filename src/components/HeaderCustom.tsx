import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentAccount } from "../utils";

interface IProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderCustom = (props: IProps) => {
  const { collapsed, setCollapsed } = props;

  const account = getCurrentAccount();
  const navigate = useNavigate();
  const { Header } = Layout;

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];

  return (
    // <div className="header">
    //   <div className="header__left" onClick={() => navigate("/")}>
    //     <VideoCameraOutlined className="header__left__item logo" />

    //     <div className="header__left__item">The Movie Database</div>
    //   </div>

    //   <div className="header__right">
    //     <Dropdown menu={{ items }}>
    //       <div className="header__right__btn">
    //         <UserOutlined className="header__right__btn__avatar" />
    //         <span>{account?.username}</span>
    //       </div>
    //     </Dropdown>
    //   </div>
    // </div>
    <Header style={{ padding: 0 }} className="header-custom">
      <div className="header-custom__left">
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined className="header-custom__left__btn__icon" />
            ) : (
              <MenuFoldOutlined className="header-custom__left__btn__icon" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          className="header-custom__left__btn"
        />

        <div
          className="header-custom__left__logo"
          onClick={() => navigate("/")}
        >
          The Movie Database
        </div>
      </div>

      <div className="header-custom__right">
        <Dropdown menu={{ items }}>
          <div className="header-custom__right__btn">
            <UserOutlined className="header-custom__right__btn__avatar" />
            <span>{account?.username}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderCustom;

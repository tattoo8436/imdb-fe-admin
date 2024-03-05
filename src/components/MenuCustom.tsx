import {
  BarsOutlined,
  SolutionOutlined,
  StarOutlined,
  StockOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const itemPages = [
  {
    key: "/home",
    label: "Thống kê",
    icon: <StockOutlined />,
  },
  {
    key: "/movie",
    label: "Phim",
    icon: <VideoCameraOutlined />,
  },
  {
    key: "/actor",
    label: "Diễn viên",
    icon: <StarOutlined />,
  },
  {
    key: "/director",
    label: "Đạo diễn",
    icon: <SolutionOutlined />,
  },
  {
    key: "/genre",
    label: "Thể loại",
    icon: <BarsOutlined />,
  },
];

const MenuCustom = (props: IProps) => {
  const { collapsed, setCollapsed } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const { Sider } = Layout;

  const [menu, setMenu] = useState(
    itemPages.find((i) => location.pathname.includes(i.key))?.key ?? "/"
  );

  useEffect(() => {
    setMenu(
      itemPages.find((i) => location.pathname.includes(i.key))?.key ?? "/"
    );
  }, [location]);

  const handleChangeMenu = (e: any) => {
    navigate(e.key);
    setMenu(e.key);
  };

  return (
    // <div className="menu-custom">
    //   <Menu
    //     style={{ height: "100vh" }}
    //     selectedKeys={[menu]}
    //     mode="inline"
    //     items={itemPages}
    //     onClick={handleChangeMenu}
    //   />
    // </div>
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="menu-custom"
    >
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        selectedKeys={[menu]}
        items={itemPages}
        theme="dark"
        onClick={handleChangeMenu}
      />
    </Sider>
  );
};

export default MenuCustom;

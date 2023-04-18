import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu theme = "dark" mode="horizontal" selectedKeys={[current]} className="mb-2">
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
        style={{ fontWeight: "bold" }} // Add style to make title bold
      >
        <Link href="/">
          <a>Elearning</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
        key="/instructor/course/create"
        onClick={(e) => setCurrent(e.key)}
        icon={<CarryOutOutlined />}
        style={{ fontWeight: "bold" }} // Add style to make title bold
      >
          <Link href="/instructor/course/create">
            <a>Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
        key="/user/become-instructor"
        onClick={(e) => setCurrent(e.key)}
        icon={<TeamOutlined />}
        style={{ fontWeight: "bold" }} // Add style to make title bold
      >
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
         <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
            style={{ fontWeight: "bold" }} // Add style to make title bold
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>

          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
            style={{ fontWeight: "bold" }} // Add style to make title bold
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
        style={{ fontWeight: "bold" }} 
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="ml-auto"
        >
          <ItemGroup>
            <Item key="/user"
              style={{ fontWeight: "bold" }} >
              <Link href="/user">
             
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item onClick={logout} style={{ fontWeight: "bold" }}>
          {/* Add style to make title bold */}
          Logout
        </Item>
          </ItemGroup>
        </SubMenu>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
        key="/instructor"
        onClick={(e) => setCurrent(e.key)}
        icon={<TeamOutlined />}
        className="float-end"
        style={{ fontWeight: "bold" }} // Add style to make title bold
      >
          <Link href="/instructor">
            <a>Instructor</a>
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;

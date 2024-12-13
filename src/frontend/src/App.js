import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from "react";

import StudentDrawerForm from "./studentDrawerForm";

import {
  Layout, Menu,
  Breadcrumb,
  Table,
  Spin,
  Empty
} from "antd";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined
} from "@ant-design/icons";

import { getAllStudents } from "./client";

import "./App.css";

const { Header, Content, Footer, Sider } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const colorBgContainer = "#fff";
const borderRadiusLG = "8px";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
];

const breadcrumbItems = [
  { title: 'User' },
  { title: 'Bill' },
];

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchStudents = () =>
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setFetching(false);
      });

  useEffect(() => {
    console.log("component is mounted");
    fetchStudents();
  }, []);

  const renderStudents = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />;
    }
    if (!students || students.length <= 0) {
      return <Empty />;
    }

    return (
      <>
      <StudentDrawerForm
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}/>

      <Table
        dataSource={students}
        columns={columns}
        rowKey={(student) => student.id}
        bordered
        title={() => (
          <button className="btn btn-primary" onClick={() => setShowDrawer(!showDrawer)}>Add a student</button>
        )}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
      />
      </>
    );
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {renderStudents()}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;

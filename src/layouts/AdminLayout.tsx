"use client";

import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/common/SideBar';
import HeaderBar from '@/components/common/HeaderBar';
import '../assets/layout/admin-dashboard.scss';

const { Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 576) {
      setCollapsed(true);
    }
  }, []);

  return (
    <Layout id="custom-layout">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="custom-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

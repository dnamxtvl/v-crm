import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import '../../assets/layout/sidebar.scss';

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: Props) => {
  return (
    <Sider
      collapsible
      trigger={null}
      width={250}
      collapsed={collapsed}
      className="custom-sider"
      style={{ background: '#fff' }}
    >
      <div className="ant-pro-sider-menu-logo flex items-center">
        <img className="app-logo-sidebar" src="/img/logo.jpg" alt="logo" />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={[
          {
            key: 'sub1',
            icon: <UserOutlined />,
            label: 'User',
            children: [
              { key: '1', label: 'List' },
            ],
          },
          {
            key: 'sub2',
            icon: <VideoCameraOutlined />,
            label: 'Media',
            children: [
              { key: '2', label: 'Videos' },
              { key: '3', label: 'Images' },
            ],
          },
          {
            key: '4',
            icon: <UploadOutlined />,
            label: 'Upload',
            children: [
              { key: '5', label: 'Videos' },
              { key: '6', label: 'Images' },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;

import { Layout, Avatar, Dropdown, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import '../../assets/layout/header.scss';
import { useRouter } from '../../../i18n.config';
import { MenuProps } from 'antd';
import query from '@/services/core/api';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE_APP } from '@/constants/config/route';

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const HeaderBar = ({ collapsed, setCollapsed }: Props) => {
  const { mutateAsync: logoutMutate } = query.auth.logoutMutation();
  const { logOut } = useAuth();
  const router = useRouter();

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        router.push('/profile');
        break;
      case 'settings':
        router.push('/settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout =  async () => {
    try {
      await logoutMutate();
      logOut();
    } catch (error) {}

    router.push(ROUTE_APP.AUTH.LOGIN);
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Layout.Header className="custom-header">
      {collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => setCollapsed(false)}
        />
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => setCollapsed(true)}
        />
      )}
      <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight">
        <Avatar className="cursor-pointer" size="large" src="/img/avatars/14.png" />
      </Dropdown>
    </Layout.Header>
  );
};

export default HeaderBar;

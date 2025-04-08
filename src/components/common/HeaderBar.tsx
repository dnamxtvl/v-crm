import { Layout, Avatar, Dropdown, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import '../../assets/layout/header.scss';
import { useRouter, usePathname } from '../../../i18n.config';
import { MenuProps } from 'antd';
import query from '@/services/core/api';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE_APP } from '@/constants/config/route';
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { defaultLang } from '../../../i18n.config';
import { setLang } from '@/store/slices/authSlice';
import { setCookie } from 'cookies-next';

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const HeaderBar = ({ collapsed, setCollapsed }: Props) => {
  const { mutateAsync: logoutMutate } = query.auth.logoutMutation();
  const { logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const dispatch = useDispatch();

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

  const languageItems: MenuProps['items'] = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'Tiếng Việt' },
  ];

  const switchLanguage = async (key: string) => {
    dispatch(setLang(key));
    setCookie('lang', key);
    router.replace(pathname, { locale: key as 'en' | 'vi' })
  }

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
      <div className="right-header">
        <Dropdown menu={{ items: languageItems, onClick: (e) => switchLanguage(e.key) }} placement="bottomRight">
          <span className="cursor-pointer px-2">🌐 + { locale ?? defaultLang }</span>
        </Dropdown>
        <span className="h-6 border border-gray-300 mr-1"></span>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          placement="bottomRight"
        >
          <Avatar
            className="cursor-pointer"
            size="large"
            src="/img/avatars/14.png"
          />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default HeaderBar;

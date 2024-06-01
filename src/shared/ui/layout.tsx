import { Tabs, Tab } from '@nextui-org/react';
import { Key, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useListSettingStore } from '../store/list-setting';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const resetSetting = useListSettingStore((state) => state.reset);

  const handleTabSelectChange = (key: Key) => {
    const path = key === 'bookmark' ? '/bookmark' : '/';
    if (path === '/') resetSetting();
    navigate(path);
  };

  const selectKey = () => {
    if (location.pathname === '/bookmark') return 'bookmark';

    return 'home';
  };

  return (
    <div className="h-full w-full p-5">
      <Tabs
        fullWidth={true}
        size="lg"
        classNames={{
          cursor: '!bg-white',
          tab: 'p-5',
        }}
        selectedKey={selectKey()}
        onSelectionChange={handleTabSelectChange}
      >
        <Tab title="가상자산 시세 목록" key="home" className="h-fit text-2xl font-bold">
          {children}
        </Tab>
        <Tab title="북마크 목록" key="bookmark" className="h-fit text-2xl font-bold">
          {children}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Layout;

import { Tabs, Tab } from '@nextui-org/react';
import { Key, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleTabSelectChange = (key: Key) => {
    const path = key === 'bookmark' ? '/bookmark' : '/';
    navigate(path);
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
        onSelectionChange={handleTabSelectChange}
      >
        <Tab title="가상자산 시세목록" key="home" className="h-fit text-2xl font-bold">
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

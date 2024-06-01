import { Tabs, Tab } from '@nextui-org/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full w-full p-5">
      <Tabs
        fullWidth={true}
        size="lg"
        classNames={{
          cursor: '!bg-white',
        }}
      >
        <Tab title="가상자산 시세목록" className="h-fit p-5 text-2xl font-bold">
          {children}
        </Tab>
        <Tab title="북마크 목록" className="h-fit p-5 text-2xl font-bold">
          {children}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Layout;

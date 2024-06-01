import { Tabs, Tab } from '@nextui-org/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full w-full p-5">
      <Tabs fullWidth={true}>
        <Tab title="가상자산 시세목록">{children}</Tab>
        <Tab title="북마크 목록">{children}</Tab>
      </Tabs>
    </div>
  );
};

export default Layout;

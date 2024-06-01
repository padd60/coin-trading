import { Spinner } from '@nextui-org/spinner';

const Loading = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-[rgba(0,0,0,0.8)]">
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;

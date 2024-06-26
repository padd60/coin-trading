import { Button } from '@nextui-org/react';

const ErrorPage = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 p-5">
      <h1 className="text-center text-4xl font-bold">일시적으로 오류가 발생했습니다</h1>
      <h2 className="text-center text-lg font-semibold">
        새로고침을 하시거나 지속적 문제 발생시 개발자에게 문의바랍니다.
      </h2>
      <Button onClick={refreshPage}> 새로고침 하기 </Button>
    </div>
  );
};

export default ErrorPage;

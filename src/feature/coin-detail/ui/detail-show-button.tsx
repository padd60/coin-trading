import { Button } from '@nextui-org/react';

type DetailShowButtonProps = {
  isShow: boolean;
  onClickShowButton: () => void;
};

const DetailShowButton = ({ isShow, onClickShowButton }: DetailShowButtonProps) => {
  return (
    <Button
      className="border bg-white p-4"
      style={{
        height: 'fit-content',
      }}
      fullWidth={true}
      onClick={onClickShowButton}
    >
      {isShow ? '설명닫기' : '설명보기'}
    </Button>
  );
};

export default DetailShowButton;

import { Input } from '@nextui-org/react';
import { ChangeEvent } from 'react';

type ExchangeInputProps = {
  label: string;
  value: string;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ExchangeInput = ({ label, value, onChangeInput }: ExchangeInputProps) => {
  return (
    <div className="flex h-12 items-center">
      <span className="bg-gray-300 p-3 font-bold">{label.toLocaleUpperCase()}</span>
      <Input
        classNames={{ inputWrapper: 'rounded-none h-full', base: 'h-full', input: 'text-end' }}
        value={value}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default ExchangeInput;

import { useEffect, useState } from 'react';

type BookmarkCheckBoxProps = {
  check?: boolean;
};

const BookmarkCheckBox = ({ check }: BookmarkCheckBoxProps) => {
  const [checked, setChecked] = useState(check);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setChecked(check);
  }, [check]);

  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <span className="checkmark inline-block" />
    </label>
  );
};

export default BookmarkCheckBox;

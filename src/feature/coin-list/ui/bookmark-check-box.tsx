type BookmarkCheckBoxProps = {
  check?: boolean;
};

const BookmarkCheckBox = ({ check }: BookmarkCheckBoxProps) => {
  return (
    <div className="checkbox-container">
      <span className={`checkmark inline-block ${check ? 'checked' : ''}`} />
    </div>
  );
};

export default BookmarkCheckBox;

type BookmarkCheckBoxProps = {
  check?: boolean;
};

const BookmarkCheckBox = ({ check = false }: BookmarkCheckBoxProps) => {
  return (
    <div className="checkbox-container flex h-full w-fit items-center">
      <span className={`checkmark inline-block ${check ? 'checked' : ''}`} />
    </div>
  );
};

export default BookmarkCheckBox;

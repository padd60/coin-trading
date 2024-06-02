import BookmarkCheckBox from 'src/shared/ui/bookmark-check-box';

type CheckBookmarkProps = {
  id: string;
  onClickBookmark: (id: string) => void;
  check: boolean;
};

const CheckBookmark = ({ id, onClickBookmark, check }: CheckBookmarkProps) => {
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        onClickBookmark(id);
      }}
    >
      <BookmarkCheckBox check={check} />
    </span>
  );
};

export default CheckBookmark;

import React from "react";


type Props = {
  pageCount: number;
  page: number;
  setPage: React.Dispatch<number>;
};

const EpisodePagination: React.FC<Props> = ({
  pageCount,
  page,
  setPage,
}) => {
  return (
    <>
      {[...Array(pageCount)].map((_, i) => {
        const active = i === page;
        const style = active
          ? "text-blue-600 text-lg underline mr-4"
          : "text-blue-600 text-lg mr-4";
        return (
          <button className={style} onClick={(e) => setPage(i)}>
            {i + 1}
          </button>
        );
      })}
    </>
  );
};

export default EpisodePagination;
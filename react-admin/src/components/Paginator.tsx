import React from "react";

const Paginator = (props: {
  page: number;
  lastPage: number;
  pageChanged: (page: number) => void;
}) => {
  const { page, lastPage, pageChanged } = props;

  const prevPageHandler = () => {
    if (page > 1) {
      pageChanged(page - 1);
    }
  };

  const nextPageHandler = () => {
    if (page < lastPage) {
      pageChanged(page + 1);
    }
  };

  const pageHandler = (page: number) => {
    if (page > 0 && page <= lastPage) {
      pageChanged(page);
    }
  };

  let pages: number[] = [];
  for (let i = 1; i <= lastPage; i++) {
    pages[i - 1] = i;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={prevPageHandler}>
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className="page-item">
            <button className="page-link" onClick={() => pageHandler(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={nextPageHandler}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;

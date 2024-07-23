import { useNavigate } from 'react-router-dom';

interface PaginationControlsProps {
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  totalPages: number;
  initialPagesToShow?: number;
}

function PaginationControls({
  currentPage,
  prevPage,
  nextPage,
  totalPages,
  initialPagesToShow = 5,
}: PaginationControlsProps) {
  const navigate = useNavigate();

  const startIndex = Math.max(
    currentPage - Math.floor(initialPagesToShow / 2),
    1,
  );
  const endIndex = Math.min(startIndex + initialPagesToShow - 1, totalPages);

  const pagesInRange = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i,
  );
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      <button disabled={currentPage === 1} onClick={() => prevPage()}>
        Previous
      </button>

      {pagesInRange.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => navigate(`/?page=${pageNumber}`)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}

      <button disabled={currentPage === totalPages} onClick={() => nextPage()}>
        Next
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}

export default PaginationControls;

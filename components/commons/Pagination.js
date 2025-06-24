import React from 'react';
import Link from 'next/link';

export default function Pagination({ 
  currentPage, 
  pageCount, 
  baseUrl,
  queryParam = 'page' 
}) {
  // Function to generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // If there's only one page, don't render pagination
  if (pageCount <= 1) {
    return null;
  }

  // Construct URL for a specific page
  const getPageUrl = (pageNumber) => {
    // If baseUrl already has query parameters
    if (baseUrl.includes('?')) {
      return `${baseUrl}&${queryParam}=${pageNumber}`;
    }
    return `${baseUrl}?${queryParam}=${pageNumber}`;
  };

  return (
    <div className="row">
      <nav className="pagination">
        {currentPage > 1 ? (
          <Link href={getPageUrl(currentPage - 1)} legacyBehavior>
            <a className="page-numbers prev">Prev</a>
          </Link>
        ) : (
          <span className="page-numbers prev inactive">Prev</span>
        )}
        
        {getPageNumbers().map(num => 
          num === currentPage ? (
            <span key={num} className="page-numbers current" aria-current="page">
              {num}
            </span>
          ) : (
            <Link key={num} href={getPageUrl(num)} legacyBehavior>
              <a className="page-numbers">{num}</a>
            </Link>
          )
        )}
        
        {currentPage < pageCount ? (
          <Link href={getPageUrl(currentPage + 1)} legacyBehavior>
            <a className="page-numbers next">Next</a>
          </Link>
        ) : (
          <span className="page-numbers next inactive">Next</span>
        )}
      </nav>
    </div>
  );
}

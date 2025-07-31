import { useState, useCallback } from 'react';

export interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage: number;
  totalItems: number;
}

export const usePagination = ({ 
  initialPage = 1, 
  itemsPerPage, 
  totalItems 
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);
  
  const goToNext = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);
  
  const goToPrevious = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);
  
  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;
  
  return {
    currentPage,
    totalPages,
    offset,
    itemsPerPage,
    goToPage,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious
  };
};
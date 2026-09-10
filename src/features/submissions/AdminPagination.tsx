import { useMemo } from 'react';
import { getAdminPageItems } from './adminPaginationItems';

interface Props {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function AdminPagination({ currentPage, pageCount, onPageChange }: Props) {
  const items = useMemo(() => getAdminPageItems(currentPage, pageCount), [currentPage, pageCount]);
  return <nav className="admin-pagination" aria-label="학생 목록 페이지"><button type="button" className="admin-page-arrow" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>이전</button>{items.map((item) => item === 'ellipsis-start' || item === 'ellipsis-end' ? <span className="admin-page-ellipsis" key={item} aria-hidden="true">…</span> : <button type="button" className="admin-page-number" key={item} aria-current={item === currentPage ? 'page' : undefined} aria-label={`페이지 ${item}`} onClick={() => onPageChange(item)}>{item}</button>)}<button type="button" className="admin-page-arrow" disabled={currentPage >= pageCount} onClick={() => onPageChange(currentPage + 1)}>다음</button></nav>;
}

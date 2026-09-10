export type AdminPageItem = number | 'ellipsis-start' | 'ellipsis-end';

export function getAdminPageItems(currentPage: number, pageCount: number): AdminPageItem[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const candidates = [...new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1])]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b);
  const items: AdminPageItem[] = [];
  candidates.forEach((page, index) => {
    if (index > 0 && page - candidates[index - 1] > 1) items.push(index === 1 ? 'ellipsis-start' : 'ellipsis-end');
    items.push(page);
  });
  return items;
}

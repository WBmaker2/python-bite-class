import type { InvalidSubmissionRecord, SubmissionRecord } from './types';

export type SubmissionRow = SubmissionRecord | InvalidSubmissionRecord;
export interface StudentGroup { key: string; latest: SubmissionRecord; history: SubmissionRecord[]; }
export const ADMIN_PAGE_SIZE = 10;

function isSubmission(row: SubmissionRow): row is SubmissionRecord { return !('invalid' in row); }
function submittedTime(row: SubmissionRecord): number {
  if (!row.submittedAt) return 0;
  const value = new Date(row.submittedAt).getTime();
  return Number.isNaN(value) ? 0 : value;
}
function groupKey(row: SubmissionRecord): string { return `${row.studentUid}\u0000${row.profileId}`; }
function matchesQuery(row: SubmissionRecord, query: string): boolean { return `${row.school} ${row.name} ${row.id} ${row.studentUid} ${row.profileId}`.toLocaleLowerCase().includes(query); }

/** Group history before filtering so matches retain their older submissions. */
export function groupStudentSubmissions(rows: SubmissionRow[], query = ''): StudentGroup[] {
  const normalized = query.trim().toLocaleLowerCase();
  const groups = new Map<string, SubmissionRecord[]>();
  rows.filter(isSubmission).forEach((row) => { const key = groupKey(row); groups.set(key, [...(groups.get(key) ?? []), row]); });
  return [...groups.entries()]
    .filter(([, groupRows]) => !normalized || groupRows.some((row) => matchesQuery(row, normalized)))
    .map(([key, groupRows]) => {
      const sorted = [...groupRows].sort((a, b) => submittedTime(b) - submittedTime(a) || b.id.localeCompare(a.id));
      return { key, latest: sorted[0], history: sorted.slice(1) } satisfies StudentGroup;
    })
    .sort((a, b) => submittedTime(b.latest) - submittedTime(a.latest) || b.latest.id.localeCompare(a.latest.id));
}

export function paginateStudentGroups(groups: StudentGroup[], page: number, pageSize = ADMIN_PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(groups.length / pageSize));
  const currentPage = Math.min(Math.max(Number.isFinite(page) ? Math.trunc(page) : 1, 1), pageCount);
  return { currentPage, pageCount, groups: groups.slice((currentPage - 1) * pageSize, currentPage * pageSize) };
}

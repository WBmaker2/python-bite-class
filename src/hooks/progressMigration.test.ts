import { describe, expect, it } from 'vitest';
import { lessonRedirects, migrateLessonId, migrateProgress } from './progressMigration';

describe('progress migration', () => {
  it('maps completed records from merged lessons to their surviving lesson', () => {
    expect(Object.keys(lessonRedirects)).toHaveLength(4);
    expect(migrateLessonId('chapter-2-4')).toBe('chapter-2-3');
    expect(migrateProgress({ completed: ['chapter-2-4', 'chapter-2-3'] }).completed).toEqual(['chapter-2-3']);
  });

  it('keeps old code without copying a deleted exercise into another exercise', () => {
    const migrated = migrateProgress({
      codeByLesson: {
        'chapter-2-4': 'old code',
        'chapter-2-3': 'learner code',
        'chapter-3-4': 'merged code',
      },
    });
    expect(migrated.codeByLesson['chapter-2-4']).toBe('old code');
    expect(migrated.codeByLesson['chapter-2-3']).toBe('learner code');
    expect(migrated.codeByLesson['chapter-3-4']).toBe('merged code');
    expect(migrated.codeByLesson['chapter-3-3']).toBeUndefined();
  });
});

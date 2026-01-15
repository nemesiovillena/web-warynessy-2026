import * as migration_20260115_120514_initial from './20260115_120514_initial';

export const migrations = [
  {
    up: migration_20260115_120514_initial.up,
    down: migration_20260115_120514_initial.down,
    name: '20260115_120514_initial'
  },
];

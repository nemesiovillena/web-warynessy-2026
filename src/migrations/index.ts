import * as migration_20260115_120514_initial from './20260115_120514_initial';
import * as migration_20260209_191504_add_menus_grupo from './20260209_191504_add_menus_grupo';
import * as migration_20260218_192308 from './20260218_192308';

export const migrations = [
  {
    up: migration_20260115_120514_initial.up,
    down: migration_20260115_120514_initial.down,
    name: '20260115_120514_initial',
  },
  {
    up: migration_20260209_191504_add_menus_grupo.up,
    down: migration_20260209_191504_add_menus_grupo.down,
    name: '20260209_191504_add_menus_grupo',
  },
  {
    up: migration_20260218_192308.up,
    down: migration_20260218_192308.down,
    name: '20260218_192308'
  },
];

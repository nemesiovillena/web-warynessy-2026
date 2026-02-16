import * as migration_20260115_120514_initial from './20260115_120514_initial';
import * as migration_20260209_191504_add_menus_grupo from './20260209_191504_add_menus_grupo';
import * as migration_20260215_200000_add_contact_whatsapp from './20260215_200000_add_contact_whatsapp';
import * as migration_20260215_201000_add_localization_tables from './20260215_201000_add_localization_tables';
import * as migration_20260215_202000_fix_localization_tables from './20260215_202000_fix_localization_tables';
import * as migration_20260216_161329_fix_localization_types from './20260216_161329_fix_localization_types';

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
    up: migration_20260215_200000_add_contact_whatsapp.up,
    down: migration_20260215_200000_add_contact_whatsapp.down,
    name: '20260215_200000_add_contact_whatsapp',
  },
  {
    up: migration_20260215_201000_add_localization_tables.up,
    down: migration_20260215_201000_add_localization_tables.down,
    name: '20260215_201000_add_localization_tables',
  },
  {
    up: migration_20260215_202000_fix_localization_tables.up,
    down: migration_20260215_202000_fix_localization_tables.down,
    name: '20260215_202000_fix_localization_tables',
  },
  {
    up: migration_20260216_161329_fix_localization_types.up,
    down: migration_20260216_161329_fix_localization_types.down,
    name: '20260216_161329_fix_localization_types'
  },
];

import * as migration_20260407_115952 from './20260407_115952';
import * as migration_20260504_120000 from './20260504_120000';

export const migrations = [
  {
    up: migration_20260407_115952.up,
    down: migration_20260407_115952.down,
    name: '20260407_115952'
  },
  {
    up: migration_20260504_120000.up,
    down: migration_20260504_120000.down,
    name: '20260504_120000'
  },
];

// https://github.com/sequelize/umzug#configuration
// https://github.com/sequelize/umzug#sequelizestorage
export default {
  migration: {
    modelName: 'SequelizeMeta',
    path: 'src/database/migrations',
    up: false,
    down: false
  },
  seeder: {
    modelName: 'SequelizeSeederMeta',
    path: 'src/database/seeders',
    up: false,
    down: false
  }
}

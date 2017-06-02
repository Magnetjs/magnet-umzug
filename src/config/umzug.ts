// https://github.com/sequelize/umzug#configuration
// https://github.com/sequelize/umzug#sequelizestorage
export default function ({ config: { env } }) {
  return {
    storage: 'sequelize',
    tasks: [
      // For production
      {
        storageOptions: {
          modelName: 'UmzugMigrationMeta',
          magnet: 'sequelize'
        },
        migrations: { path: 'src/database/migrations' },
        down: false,
        up: false
      },
      // For production
      {
        storageOptions: {
          modelName: 'UmzugSeederMeta',
          magnet: 'sequelize'
        },
        migrations: { path: 'src/database/seeders' },
        down: false,
        up: false
      },
      // For test
      {
        storage: 'none',
        migrations: { path: 'src/database/seeders_test' },
        down: false,
        up: env.test
      }
    ]
  }
}

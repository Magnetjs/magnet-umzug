import { Module } from 'magnet-core/module'
import * as Umzug from 'umzug'

export default class MagnetUmzug extends Module {
  get moduleName () { return 'umzug' }
  get defaultConfig () { return __dirname }

  async setup () {
    try {
      for (const migrationType of ['migration', 'seeder']) {
        const storageOptions = {
          ...this.config[migrationType],
          sequelize: this.app.sequelize
        }

        await this.prepare(
          this.config[migrationType],
          storageOptions
        )
      }
    } catch (err) {
      throw err
    }
  }

  async prepare (config, storageOptions) {
    try {
      const path = `${this.app.config.baseDirPath}/${config.path}`

      const umzug = new Umzug({
        storage: 'sequelize',
        storageOptions,
        migrations: {
          params: [this.app, this.app.sequelize.getQueryInterface(), this.app.sequelize.constructor, function () {
            throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.')
          }],
          path,
          pattern: /\.js$/
        }
      })

      if (config.down) {
        await umzug.down(config.down)

        this.log.info(`${config.path} down complete!`)
      }

      if (config.up) {
        await umzug.up(config.up)

        this.log.info(`${config.path} up complete!`)
      }
    } catch (err) {
      this.log.error(err)
    }
  }
}

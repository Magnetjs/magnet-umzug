import { Module } from 'magnet-core/module'
import * as Umzug from 'umzug'

export default class MagnetUmzug extends Module {
  init () {
    this.moduleName = 'umzug'
    this.defaultConfig = __dirname
  }

  async setup () {
    try {
      for (const config of this.config.tasks) {
        await this.prepare(
          config,
          this.config
        )
      }
    } catch (err) {
      throw err
    }
  }

  // async prepare (config, storageOptions) {
  async prepare (lConfig: any, gConfig: any) {
    try {
      const config = Object.assign(gConfig, lConfig)

      if (config.storage === 'sequelize' && config.storageOptions.magnet) {
        config.storageOptions.sequelize = this.app[config.storageOptions.magnet]
      }

      config.migrations.path = `${this.app.config.baseDirPath}/${config.migrations.path}`
      config.migrations.params = config.migrations.params || [this.app.sequelize.getQueryInterface(), this.app.sequelize.constructor, this.app, function () {
        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.')
      }]

      const umzug = new Umzug(config)

      umzug.on('migrating', (...args) => {
        this.log.debug('migrating', args)
      })
      umzug.on('migrated', (...args) => {
        this.log.debug('migrated', args)
      })
      umzug.on('reverting', (...args) => {
        this.log.debug('reverting', args)
      })
      umzug.on('reverted', (...args) => {
        this.log.debug('reverted', args)
      })

      if (config.down) {
        await umzug.down(config.down)

        this.log.info(`${config.migrations.path} down complete!`)
      }

      if (config.up) {
        await umzug.up(config.up)

        this.log.info(`${config.migrations.path} up complete!`)
      }
    } catch (err) {
      this.log.error(err)
    }
  }
}

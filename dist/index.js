"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const Umzug = require("umzug");
class MagnetUmzug extends module_1.Module {
    get moduleName() { return 'umzug'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const config of this.config.tasks) {
                    // const storageOptions = {
                    //   ...this.config[migrationType],
                    //   sequelize: this.app.sequelize
                    // }
                    yield this.prepare(config, this.config
                    // this.config[migrationType],
                    // storageOptions
                    );
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    // async prepare (config, storageOptions) {
    prepare(lConfig, gConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = Object.assign(gConfig, lConfig);
                if (config.storage === 'sequelize' && config.storageOptions.magnet) {
                    config.storageOptions.sequelize = this.app[config.storageOptions.magnet];
                }
                config.migrations.path = `${this.app.config.baseDirPath}/${config.migrations.path}`;
                config.migrations.params = config.migrations.params || [this.app.sequelize.getQueryInterface(), this.app.sequelize.constructor, this.app, function () {
                        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
                    }];
                const umzug = new Umzug(config);
                umzug.on('migrating', (...args) => {
                    this.log.debug('migrating', args);
                });
                umzug.on('migrated', (...args) => {
                    this.log.debug('migrated', args);
                });
                umzug.on('reverting', (...args) => {
                    this.log.debug('reverting', args);
                });
                umzug.on('reverted', (...args) => {
                    this.log.debug('reverted', args);
                });
                if (config.down) {
                    yield umzug.down(config.down);
                    this.log.info(`${config.migrations.path} down complete!`);
                }
                if (config.up) {
                    yield umzug.up(config.up);
                    this.log.info(`${config.migrations.path} up complete!`);
                }
            }
            catch (err) {
                this.log.error(err);
            }
        });
    }
}
exports.default = MagnetUmzug;
//# sourceMappingURL=index.js.map
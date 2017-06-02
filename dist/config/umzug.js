"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/sequelize/umzug#configuration
// https://github.com/sequelize/umzug#sequelizestorage
exports.default = {
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
};
//# sourceMappingURL=umzug.js.map
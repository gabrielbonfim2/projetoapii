"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1792634321977 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1792634321977 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({ name: "users", columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar", length: "255" },
                { name: "email", type: "varchar", length: "255", isUnique: true },
                { name: "situationId", type: "int" },
                { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }
            ] }));
        await queryRunner.createForeignKey("users", new typeorm_1.TableForeignKey({ columnNames: ["situationId"], referencedColumnNames: ["id"], referencedTableName: "situations", onDelete: "CASCADE" }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("users");
        if (table)
            for (const foreignKey of table.foreignKeys)
                await queryRunner.dropForeignKey("users", foreignKey);
        await queryRunner.dropTable("users");
    }
}
exports.CreateUsersTable1792634321977 = CreateUsersTable1792634321977;

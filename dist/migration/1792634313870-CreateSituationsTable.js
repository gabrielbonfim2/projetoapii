"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSituationsTable1792634313870 = void 0;
const typeorm_1 = require("typeorm");
class CreateSituationsTable1792634313870 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "situations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nameSituation",
                    type: "varchar"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("situations");
    }
}
exports.CreateSituationsTable1792634313870 = CreateSituationsTable1792634313870;

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
export class CreateUsersTable1792634321977 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ name: "users", columns: [
            { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
            { name: "name", type: "varchar", length: "255" },
            { name: "email", type: "varchar", length: "255", isUnique: true },
            { name: "situationId", type: "int" },
            { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
            { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }
        ] }));
        await queryRunner.createForeignKey("users", new TableForeignKey({ columnNames: ["situationId"], referencedColumnNames: ["id"], referencedTableName: "situations", onDelete: "CASCADE" }));
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        if (table) for (const foreignKey of table.foreignKeys) await queryRunner.dropForeignKey("users", foreignKey);
        await queryRunner.dropTable("users");
    }
}

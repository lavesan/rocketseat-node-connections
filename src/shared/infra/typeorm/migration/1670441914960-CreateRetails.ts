import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRetails1670441914960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rental",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "start_data",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "end_data",
            type: "timestamp",
          },
          {
            name: "expected_return_data",
            type: "timestamp",
          },
          {
            name: "total",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCarRental",
            referencedTableName: "car",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            // onDelete: "SET NULL",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUserRental",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            // onDelete: "SET NULL",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rental");
  }
}

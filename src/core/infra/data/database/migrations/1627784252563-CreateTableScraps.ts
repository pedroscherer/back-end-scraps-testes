import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTableScraps1626658047457 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'scraps',
                columns: [
                    {
                        name: 'uid',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },
                    {
                        name: 'user_uid',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        referencedTableName: 'users',
                        referencedColumnNames: ['uid'],
                        columnNames: ['user_uid'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }),
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('scraps', true, true, true);
    }
}

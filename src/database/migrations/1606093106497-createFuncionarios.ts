import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createFuncionarios1606093106497 implements MigrationInterface {

  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'funcionarios',
      columns: [
        {
        name: 'id',
        type: 'integer',
        unsigned: true,
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'functions',
          type: 'varchar',
        },
        {
          name: 'departament',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'telefone',
          type: 'varchar',
        },
        {
          name: 'curtir',
          type: 'integer',
        },
        {
          name: 'fotos',
          type: 'varchar'
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('funcionarios')
  }

}
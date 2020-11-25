import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriarDependentes1606104554028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'dependentes',
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
              name: 'data_nascimento',
              type: 'varchar',
            },
            {
              name: 'grau_parentesco',
              type: 'varchar'
            },
            {
              name: 'foto',
              type: 'varchar'
            },
            {
                name: 'funcionario_id',
                type: 'integer'
              }
          ],
          foreignKeys: [
            {
              name: 'DependentesFuncionarios',
              columnNames: ['funcionario_id'],
              referencedTableName: 'funcionarios',
              referencedColumnNames: ['id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            }
          ]
        }))
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('funcionarios')
      }
    
    }
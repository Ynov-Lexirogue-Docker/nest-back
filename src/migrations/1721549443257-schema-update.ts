import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1721549443257 implements MigrationInterface {
    name = 'SchemaUpdate1721549443257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`book\``);
    }

}

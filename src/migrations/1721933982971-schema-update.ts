import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1721933982971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\`
                                 (
                                     \`id\`   int          NOT NULL AUTO_INCREMENT,
                                     \`name\` varchar(255) NOT NULL,
                                     PRIMARY KEY (\`id\`)
                                 ) ENGINE = InnoDB`);

        await queryRunner.query(`CREATE TABLE \`user_role\`
                                 (
                                     \`user_id\` int          NOT NULL AUTO_INCREMENT,
                                     \`role_id\` varchar(255) NOT NULL,
                                     PRIMARY KEY (\`user_id\`, \`role_id\`),
                                     FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE,
                                     FOREIGN KEY (\`role_id\`) REFERENCES \`role\` (\`id\`) ON DELETE CASCADE
                                 ) ENGINE = InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE role`);
        await queryRunner.query(`DROP TABLE user_role`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserDetails1601247306529 implements MigrationInterface {
    name = 'fixUserDetails1601247306529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ADD "name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "name"`);
    }

}

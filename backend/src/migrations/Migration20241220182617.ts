import { Migration } from '@mikro-orm/migrations';

export class Migration20241220182617 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`member_credentials_entity\` (\`id\` bigint unsigned not null auto_increment primary key, \`email\` varchar(255) not null, \`password_hash\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`member_credentials_entity\` add unique \`member_credentials_entity_email_unique\`(\`email\`);`);

    this.addSql(`create table \`member_entity\` (\`id\` bigint unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`avatar_url\` varchar(255) null, \`credentials_id\` bigint unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`member_entity\` add unique \`member_entity_credentials_id_unique\`(\`credentials_id\`);`);

    this.addSql(`alter table \`member_entity\` add constraint \`member_entity_credentials_id_foreign\` foreign key (\`credentials_id\`) references \`member_credentials_entity\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`member_entity\` drop foreign key \`member_entity_credentials_id_foreign\`;`);

    this.addSql(`drop table if exists \`member_credentials_entity\`;`);

    this.addSql(`drop table if exists \`member_entity\`;`);
  }

}

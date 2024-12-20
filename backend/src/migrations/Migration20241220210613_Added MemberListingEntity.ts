import { Migration } from '@mikro-orm/migrations';

export class Migration20241220210613_Added_MemberListingEntity extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`member_listing_entity\` (\`id\` bigint unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`description\` varchar(255) not null, \`icon_url\` varchar(255) not null, \`required_stars\` varchar(255) not null, \`price\` varchar(255) not null, \`state\` int not null, \`owning_member_id\` bigint unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`member_listing_entity\` add index \`member_listing_entity_owning_member_id_index\`(\`owning_member_id\`);`);

    this.addSql(`alter table \`member_listing_entity\` add constraint \`member_listing_entity_owning_member_id_foreign\` foreign key (\`owning_member_id\`) references \`member_entity\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`member_listing_entity\`;`);
  }

}

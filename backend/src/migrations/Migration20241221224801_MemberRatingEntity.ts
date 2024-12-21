import { Migration } from '@mikro-orm/migrations';

export class Migration20241221224801_MemberRatingEntity extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`member_rating_entity\` (\`id\` bigint unsigned not null auto_increment primary key, \`title\` varchar(50) not null, \`description\` varchar(250) not null, \`rating\` tinyint not null, \`reviewing_member_id\` bigint unsigned not null, \`receiving_member_id\` bigint unsigned not null, \`listing_id\` bigint unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`member_rating_entity\` add index \`member_rating_entity_reviewing_member_id_index\`(\`reviewing_member_id\`);`);
    this.addSql(`alter table \`member_rating_entity\` add index \`member_rating_entity_receiving_member_id_index\`(\`receiving_member_id\`);`);
    this.addSql(`alter table \`member_rating_entity\` add index \`member_rating_entity_listing_id_index\`(\`listing_id\`);`);
    this.addSql(`alter table \`member_rating_entity\` add unique \`member_rating_entity_reviewing_member_id_receiving_c1d3d_unique\`(\`reviewing_member_id\`, \`receiving_member_id\`, \`listing_id\`);`);

    this.addSql(`alter table \`member_rating_entity\` add constraint \`member_rating_entity_reviewing_member_id_foreign\` foreign key (\`reviewing_member_id\`) references \`member_entity\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`member_rating_entity\` add constraint \`member_rating_entity_receiving_member_id_foreign\` foreign key (\`receiving_member_id\`) references \`member_entity\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`member_rating_entity\` add constraint \`member_rating_entity_listing_id_foreign\` foreign key (\`listing_id\`) references \`member_listing_entity\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`member_rating_entity\`;`);
  }

}

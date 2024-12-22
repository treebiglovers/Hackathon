import { Migration } from '@mikro-orm/migrations';

export class Migration20241221141944_Added_ListingChatEntity_and_ListingChatMessageEntity extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`listing_chat_entity\` (\`id\` bigint unsigned not null auto_increment primary key, \`listing_id\` bigint unsigned not null, \`customer_member_id\` bigint unsigned not null, \`finalized\` tinyint(1) not null default false) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`listing_chat_entity\` add index \`listing_chat_entity_listing_id_index\`(\`listing_id\`);`);
    this.addSql(`alter table \`listing_chat_entity\` add index \`listing_chat_entity_customer_member_id_index\`(\`customer_member_id\`);`);
    this.addSql(`alter table \`listing_chat_entity\` add unique \`listing_chat_entity_listing_id_customer_member_id_unique\`(\`listing_id\`, \`customer_member_id\`);`);

    this.addSql(`create table \`listing_chat_message_entity\` (\`id\` bigint unsigned not null auto_increment primary key, \`content\` varchar(500) not null, \`author_member_id\` bigint unsigned not null, \`owning_listing_chat_id\` bigint unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`listing_chat_message_entity\` add index \`listing_chat_message_entity_author_member_id_index\`(\`author_member_id\`);`);
    this.addSql(`alter table \`listing_chat_message_entity\` add index \`listing_chat_message_entity_owning_listing_chat_id_index\`(\`owning_listing_chat_id\`);`);

    this.addSql(`alter table \`listing_chat_entity\` add constraint \`listing_chat_entity_listing_id_foreign\` foreign key (\`listing_id\`) references \`member_listing_entity\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`listing_chat_entity\` add constraint \`listing_chat_entity_customer_member_id_foreign\` foreign key (\`customer_member_id\`) references \`member_entity\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`listing_chat_message_entity\` add constraint \`listing_chat_message_entity_author_member_id_foreign\` foreign key (\`author_member_id\`) references \`member_entity\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`listing_chat_message_entity\` add constraint \`listing_chat_message_entity_owning_listing_chat_id_foreign\` foreign key (\`owning_listing_chat_id\`) references \`listing_chat_entity\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`listing_chat_message_entity\` drop foreign key \`listing_chat_message_entity_owning_listing_chat_id_foreign\`;`);

    this.addSql(`drop table if exists \`listing_chat_entity\`;`);

    this.addSql(`drop table if exists \`listing_chat_message_entity\`;`);
  }

}

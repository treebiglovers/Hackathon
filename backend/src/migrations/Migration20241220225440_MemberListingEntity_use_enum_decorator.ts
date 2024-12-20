import { Migration } from '@mikro-orm/migrations';

export class Migration20241220225440_MemberListingEntity_use_enum_decorator extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`member_listing_entity\` modify \`state\` tinyint not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`member_listing_entity\` modify \`state\` int not null;`);
  }

}

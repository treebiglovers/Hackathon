import { Migration } from '@mikro-orm/migrations';

export class Migration20241220212001_MemberListingEntity_Explicit_Nullability extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`member_listing_entity\` modify \`icon_url\` varchar(255) null, modify \`required_stars\` varchar(255) null, modify \`price\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`member_listing_entity\` modify \`icon_url\` varchar(255) not null, modify \`required_stars\` varchar(255) not null, modify \`price\` varchar(255) not null;`);
  }

}

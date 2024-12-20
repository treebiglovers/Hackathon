import { Migration } from '@mikro-orm/migrations';

export class Migration20241220224503_MemberListingEntity_fix_fields_type extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`member_listing_entity\` modify \`required_stars\` int, modify \`price\` int;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`member_listing_entity\` modify \`required_stars\` varchar(255), modify \`price\` varchar(255);`);
  }

}

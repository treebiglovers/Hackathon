import { Migration } from '@mikro-orm/migrations';

export class Migration20241221220453_Explicit_String_Lengths extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`member_credentials_entity\` modify \`email\` varchar(50) not null;`);

    this.addSql(`alter table \`member_entity\` modify \`name\` varchar(50) not null;`);

    this.addSql(`alter table \`member_listing_entity\` modify \`title\` varchar(50) not null, modify \`description\` varchar(500) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`member_credentials_entity\` modify \`email\` varchar(255) not null;`);

    this.addSql(`alter table \`member_entity\` modify \`name\` varchar(255) not null;`);

    this.addSql(`alter table \`member_listing_entity\` modify \`title\` varchar(255) not null, modify \`description\` varchar(255) not null;`);
  }

}

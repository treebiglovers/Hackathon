import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/mysql";
import { EntityBase, MemberCredentialsEntity } from "./";
import { MemberListingEntity } from "@backend/entities/MemberListingEntity";
import { ListingChatMessageEntity } from "@backend/entities/ListingChatMessageEntity";
import { ListingChatEntity } from "@backend/entities/ListingChatEntity";

@Entity()
export class MemberEntity extends EntityBase
{
    @Property()
    name: string;

    @Property({ nullable: true })
    avatarURL: string | null;

    @OneToOne(() => MemberCredentialsEntity)
    credentials: MemberCredentialsEntity;
    
    @OneToMany(() => MemberListingEntity, listing => listing.owningMember)
    listings = new Collection<MemberListingEntity>(this);

    @OneToMany(() => ListingChatEntity , chat => chat.customerMember)
    listingChats = new Collection<ListingChatEntity>(this);
    
    @OneToMany(() => ListingChatMessageEntity, message => message.authorMember)
    listingChatMessages = new Collection<ListingChatMessageEntity>(this);
    
    constructor(name: string, credentials: MemberCredentialsEntity)
    {
        super();

        this.name = name;
        this.avatarURL = null;
        this.credentials = credentials;
    }
}
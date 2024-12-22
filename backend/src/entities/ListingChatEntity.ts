import { Collection, Entity, ManyToOne, OneToMany, Property, Unique } from "@mikro-orm/mysql";
import { EntityBase, MemberEntity, MemberListingEntity } from "./";
import { ListingChatMessageEntity } from "@backend/entities/ListingChatMessageEntity";

@Entity()
@Unique({ properties: [ "listing", "customerMember" ] })
export class ListingChatEntity extends EntityBase
{
    @ManyToOne(() => MemberListingEntity)
    listing: MemberListingEntity;
    
    @ManyToOne(() => MemberEntity)
    customerMember: MemberEntity;
    
    @OneToMany(
        () => ListingChatMessageEntity, 
        (listingChatMessage) => listingChatMessage.owningListingChat
    )
    messages = new Collection<ListingChatMessageEntity>(this);
    
    @Property()
    finalized: boolean;
    
    constructor(listing: MemberListingEntity, customerMember: MemberEntity)
    {
        super();
        
        this.listing = listing;
        
        this.customerMember = customerMember;
        
        this.finalized = false;
    }
}
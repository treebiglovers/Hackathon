import { Collection, Entity, Enum, ManyToOne, OneToMany, Property } from "@mikro-orm/mysql";
import { EntityBase, MemberEntity } from "./";
import { MemberListingDTO, MemberListingState } from "@common/dtos/members/listings/MemberListingDTO";
import { ListingChatMessageEntity } from "@backend/entities/ListingChatMessageEntity";
import { ListingChatEntity } from "@backend/entities/ListingChatEntity";
import { LimitConstants } from "@common/constants/LimitConstants";

@Entity()
export class MemberListingEntity extends EntityBase
{
    @Property({ length: LimitConstants.MAX_LISTING_TITLE_LENGTH })
    title: string;
    
    @Property({ length: LimitConstants.MAX_LISTING_DESCRIPTION_LENGTH })
    description: string;

    @Property({ nullable: true })
    iconURL: string | null;

    @Property({ nullable: true, columnType: "int" })
    requiredStars: number | null;

    @Property({ nullable: true, columnType: "int" })
    price: number | null;

    @Enum(() => MemberListingState)
    state: MemberListingState;
    
    @ManyToOne(() => MemberEntity)
    owningMember: MemberEntity;
    
    @OneToMany(() => ListingChatEntity, listingChat => listingChat.listing)
    chats = new Collection<ListingChatEntity>(this);
    
    constructor(memberListingDTO: MemberListingDTO, owningMember: MemberEntity)
    {
        super();
        
        this.title = memberListingDTO.title;
        this.description = memberListingDTO.description;
        this.iconURL = memberListingDTO.iconURL ?? null;
        this.requiredStars = memberListingDTO.requiredStars ?? null;
        this.price = memberListingDTO.price ?? null;
        
        // Regardless of the DTO body, we set it to available on creation.
        this.state = MemberListingState.AVAILABLE;
        
        this.owningMember = owningMember;
    }
}
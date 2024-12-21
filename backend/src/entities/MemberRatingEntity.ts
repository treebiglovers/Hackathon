import { EntityBase } from "@backend/entities/EntityBase";
import { Entity, ManyToOne, Property, Unique } from "@mikro-orm/mysql";
import { MemberEntity } from "@backend/entities/MemberEntity";
import { MemberListingEntity } from "@backend/entities/MemberListingEntity";
import { LimitConstants } from "@common/constants/LimitConstants";
import { MemberRatingsDTO } from "@common/dtos/members/ratings/MemberRatingsDTO";

@Entity()
@Unique({ properties: [ "reviewingMember", "receivingMember", "listing" ] })
export class MemberRatingEntity extends EntityBase
{
    @Property({ length: LimitConstants.MAX_RATING_TITLE_LENGTH })
    title: string;
    
    @Property({ length: LimitConstants.MAX_RATING_DESCRIPTION_LENGTH })
    description: string;

    @Property({ columnType: "tinyint" })
    rating: number;
    
    @ManyToOne(() => MemberEntity)
    reviewingMember: MemberEntity;
    
    @ManyToOne(() => MemberEntity)
    receivingMember: MemberEntity;
    
    @ManyToOne(() => MemberListingEntity)
    listing: MemberListingEntity;
    
    constructor(
        memberRatingDTO: MemberRatingsDTO,
        reviewingMember: MemberEntity,
        receivingMember: MemberEntity,
        listing: MemberListingEntity
    ) 
    {
        super();
        
        this.title = memberRatingDTO.title;
        this.description = memberRatingDTO.description;
        this.rating = memberRatingDTO.rating;
        
        this.reviewingMember = reviewingMember;
        this.receivingMember = receivingMember;
        this.listing = listing;
    }
}
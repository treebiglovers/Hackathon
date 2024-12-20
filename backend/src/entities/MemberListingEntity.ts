import { Entity, ManyToOne, Property } from "@mikro-orm/mysql";
import { EntityBase, MemberEntity } from "./";
import { MemberListingDTO, MemberListingState } from "@common/dtos/members/listings/MemberListingDTO";

@Entity()
export class MemberListingEntity extends EntityBase
{
    @Property()
    title: string;
    
    @Property()
    description: string;

    @Property({ nullable: true })
    iconURL: string | null;

    @Property({ nullable: true })
    requiredStars: number | null;
    
    @Property({ nullable: true })
    price: number | null;
    
    @Property()
    state: number;
    
    @ManyToOne(() => MemberEntity)
    owningMember: MemberEntity;
    
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
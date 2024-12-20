import { Collection, Entity, OneToMany, OneToOne, Property } from "@mikro-orm/mysql";
import { EntityBase, MemberCredentialsEntity } from "./";
import { MemberListingEntity } from "@backend/entities/MemberListingEntity";

@Entity()
export class MemberEntity extends EntityBase
{
    @Property()
    name: string;
    
    @Property()
    avatarURL: string | null;

    @OneToOne(() => MemberCredentialsEntity)
    credentials: MemberCredentialsEntity;
    
    @OneToMany(() => MemberListingEntity, listing => listing.owningMember)
    listings = new Collection<MemberListingEntity>(this);

    constructor(name: string, credentials: MemberCredentialsEntity)
    {
        super();

        this.name = name;
        this.avatarURL = null;
        this.credentials = credentials;
    }
}
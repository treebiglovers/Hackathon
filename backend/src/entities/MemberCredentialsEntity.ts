import { Entity, OneToOne, Property, Unique } from "@mikro-orm/mongodb";
import { EntityBase, MemberEntity } from "./";

@Entity()
export class MemberCredentialsEntity extends EntityBase
{
    @Unique()
    @Property()
    public email: string;

    @Property()
    public passwordHash: string;

    @OneToOne(() => MemberEntity, member => member.credentials)
    public member!: MemberEntity;

    constructor(email: string, passwordHash: string)
    {
        super();

        this.email = email;
        this.passwordHash = passwordHash;
    }
}
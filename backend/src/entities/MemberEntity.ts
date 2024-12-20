import { Entity, OneToOne, Property } from "@mikro-orm/mysql";
import { EntityBase, MemberCredentialsEntity } from "./";

@Entity()
export class MemberEntity extends EntityBase
{
    @Property()
    name: string;
    
    @Property()
    avatarURL: string | null;

    @OneToOne(() => MemberCredentialsEntity)
    credentials: MemberCredentialsEntity;

    constructor(name: string, credentials: MemberCredentialsEntity)
    {
        super();

        this.name = name;
        this.avatarURL = null;
        this.credentials = credentials;
    }
}
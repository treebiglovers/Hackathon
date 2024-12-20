import { Entity, OneToOne, Property } from "@mikro-orm/mongodb";
import { EntityBase } from "./";
import { MemberCredentialsEntity } from "./MemberCredentialsEntity";

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
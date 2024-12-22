import { Entity, OneToOne, Property, Unique } from "@mikro-orm/mysql";
import { EntityBase, MemberEntity } from "./";
import { LimitConstants } from "@common/constants/LimitConstants";

@Entity()
export class MemberCredentialsEntity extends EntityBase
{
    @Unique()
    @Property({ length: LimitConstants.MAX_EMAIL_LENGTH })
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
import { PrimaryKey, Property } from "@mikro-orm/mysql";
import { SnowflakeHelpers } from "@common/helpers/SnowflakeHelpers";

export abstract class EntityBase
{
    @PrimaryKey({ fieldName: "id" })
    private _id!: bigint;

    @Property({ persist: false })
    get id(): string
    {
        return this._id.toString();
    }

    protected constructor()
    {
        this._id = SnowflakeHelpers.generateSnowflake().valueOf();
    }
}
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
    
    set id(value)
    {
        // Do nothing. This is a dummy setter to allow Object.assign() to work, even if there's an id field.
    }

    protected constructor()
    {
        this._id = SnowflakeHelpers.generateSnowflake().valueOf();
    }
}
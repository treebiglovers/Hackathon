import { ObjectId, PrimaryKey, SerializedPrimaryKey } from "@mikro-orm/mongodb";
import { SnowflakeHelpers } from "@backend/helpers/SnowflakeHelpers";

export abstract class EntityBase
{
    @PrimaryKey()
    private _id!: ObjectId;

    @SerializedPrimaryKey()
    public id!: string;

    // protected constructor()
    // {
    //     this.id = SnowflakeHelpers.generateSnowflake().toString();
    // }
}
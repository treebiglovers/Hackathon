import { Snowflake } from "nodejs-snowflake";

export class SnowflakeHelpers
{
    // https://www.npmjs.com/package/nodejs-snowflake
    private static readonly SNOWFLAKE_GENERATOR = new Snowflake(
    {
        // https://www.epochconverter.com/
        // 13 / 12 / 2024, 4:25 AM
        custom_epoch: 1734035154,
        instance_id: 69
    });

    public static generateSnowflake = (): BigInt =>
    {
        return SnowflakeHelpers.SNOWFLAKE_GENERATOR.getUniqueID();
    }
    
    public static isSnowflakeID(id: string): boolean
    {
        try
        {
            Snowflake.timestampFromID(BigInt(id), this.SNOWFLAKE_GENERATOR.customEpoch());
            return true;
        }
        
        catch (error)
        {
            return false;
        }
    }
}

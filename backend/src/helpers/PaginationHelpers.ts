import { PaginatedRequestDTO } from "@common/dtos/PaginatedRequestDTO";

export type PaginationOptions =
{
    offset: number | undefined;
    limit: number | undefined;
}

export class PaginationHelpers
{
    public static computePaginationOptions(paginatedRequestDTO: PaginatedRequestDTO): PaginationOptions
    {
        const pageIndex = paginatedRequestDTO.pageIndex;

        const pageSize = paginatedRequestDTO.pageSize;

        let offset, limit;

        if (pageIndex !== undefined && pageSize !== undefined)
        {
            offset = pageIndex * pageSize;
        }

        else
        {
            // If pageIndex is undefined, then we set offset to undefined.
            // If pageIndex is defined but pageSize is undefined, we take pageIndex as it is.
            // End of the day, we are just assigning offset to pageIndex.
            offset = pageIndex;
        }

        limit = pageSize;

        return { offset: offset, limit: limit };
    }
}
import { PaginatedRequestDTO } from "@common/dtos/PaginatedRequestDTO";
import { EndpointConstants } from "@app/constants/EndpointConstants.ts";
import { appendJWTHeader, appendQueryParams } from "@app/services/MemberService.ts";
import { constructGET } from "@common/helpers/RequestHelpers.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO.ts";
import { MemberListingDTO } from "@common/dtos/members/listings/MemberListingDTO.ts";

export const getMemberListing = async (
    paginatedRequestDTO: PaginatedRequestDTO): Promise<[ data: MemberListingDTO[] | ErrorDTO, success: boolean ]>  =>
{
    // TODO: Consider using query params instead
    const response = await fetch(
        appendQueryParams(
            `${EndpointConstants.LISTINGS}`,
            paginatedRequestDTO
        ),
        appendJWTHeader(constructGET())
    );

    return [ await response.json(), response.ok ];
}

const DEFAULT_PAGINATED_REQUEST_DTO: Required<PaginatedRequestDTO> = { pageIndex: 0, pageSize: 5 };

export const useGetMemberListingsAsync = () =>
{
    return useInfiniteQuery(
        {
            queryKey: [ "get-member-listings" ],
            queryFn: async ({ pageParam }): Promise<MemberListingDTO[]> =>
            {
                const [data, success] = await getMemberListing(pageParam);

                if (!success)
                {
                    throw data;
                }

                return data as MemberListingDTO[];
            },
            // Copy instead of mutating DEFAULT_PAGINATED_REQUEST_DTO
            initialPageParam: { ...DEFAULT_PAGINATED_REQUEST_DTO },
            // @ts-ignore ( Yes, allPages is not used. But I am keeping it for future reference )
            getNextPageParam: (lastPage, allPages, lastPageParam)=>
            {
                if (lastPage.length != lastPageParam.pageSize)
                {
                    return undefined
                }

                // Copy instead of mutating lastPageParam - Apparently getNextPageParam
                // is called per page item, and we want getNextPageParam to remain the same
                // for the given page.
                return {
                    ...lastPageParam,
                    pageIndex: lastPageParam.pageIndex + 1
                };
            }
        });
}
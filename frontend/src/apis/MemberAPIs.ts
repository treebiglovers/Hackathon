import { EndpointConstants } from "@app/constants/EndpointConstants.ts";
import { constructGET } from "@common/helpers/RequestHelpers";
import { appendJWTHeader } from "@app/services/MemberService.ts";
import { MemberDTO } from "@common/dtos/members/MemberDTO.ts";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO.ts";
import { useQuery } from "@tanstack/react-query";
import { MemberRatingDataDTO } from "@common/dtos/members/ratings/MemberRatingDataDTO.ts";

export const getMemberAsync = async (
    id: string): Promise<[ data: MemberDTO | ErrorDTO, success: boolean ]>  =>
{
    const response = await fetch(
        `${EndpointConstants.MEMBERS}/${id}`,
        appendJWTHeader(constructGET())
    );

    return [ await response.json(), response.ok ];
}

export const useGetMemberAsync = (id: string) =>
{
    return useQuery(
    {
        queryKey: [ "get-member", id ],
        queryFn: async (): Promise<MemberDTO> =>
        {
            const [ data, success ] = await getMemberAsync(id);

            if (!success)
            {
                throw data;
            }

            return data as MemberDTO;
        }
    });
}

export const getMemberRatingDataAsync = async (
    id: string
): Promise<[ data: MemberRatingDataDTO | ErrorDTO, success: boolean ]>  =>
{
    const response = await fetch(
        `${EndpointConstants.MEMBERS}/${id}/rating`,
        appendJWTHeader(constructGET())
    );

    return [ await response.json(), response.ok ];
}

export const useGetMemberRatingDataAsync = (id: string) =>
{
    return useQuery(
    {
        queryKey: [ "get-member-rating-data", id ],
        queryFn: async (): Promise<MemberRatingDataDTO> =>
        {
            const [ data, success ] = await getMemberRatingDataAsync(id);

            if (!success)
            {
                throw data;
            }

            return data as MemberRatingDataDTO;
        }
    });
}


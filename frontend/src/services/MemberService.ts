import { create } from "zustand";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import { MemberDTO } from "@common/dtos/members/MemberDTO";
import { LoginRequestDTO } from "@common/dtos/auth/LoginRequestDTO";
import { LoginResponseDTO } from "@common/dtos/auth/LoginResponseDTO";
import { constructGET, constructPOST } from "@common/helpers/RequestHelpers";
import { EndpointConstants } from "@app/constants/EndpointConstants";
import { StatusCodes } from "http-status-codes";
import queryString from "query-string";
import { notifications, showNotification } from "@mantine/notifications";

const JWT_LOCAL_STORAGE_KEY = "JWT";

let memberDataPromise: Promise<DownloadMemberDataResponse> | undefined = undefined;

type LoginServerResponse = LoginResponseDTO | ErrorDTO;

type DownloadMemberDataResponse = MemberDTO | ErrorDTO | null;

type MemberDataState =
{
    memberData: MemberDTO | null | undefined;

    loginMemberAsync: (loginRequest: LoginRequestDTO) => Promise<[ MemberLoginStatus, LoginServerResponse ]>;

    getMemberDataAsync: (refresh?: boolean) => Promise<DownloadMemberDataResponse>;

    logoutMember: () => void;
};

export enum MemberLoginStatus
{
    SUCCESS,
    INVALID_CREDENTIALS,
    BAD_REQUEST,
}

export const useMemberData = create<MemberDataState>((
    // getState,
    setState) => (
    {
        memberData: undefined,

        loginMemberAsync: async (loginRequest: LoginRequestDTO):
            Promise<[ MemberLoginStatus, LoginServerResponse ]> =>
        {
            let response = await fetch(
                EndpointConstants.LOGIN,
                constructPOST(loginRequest)
            );

            const payload: LoginResponseDTO | ErrorDTO = await response.json();

            let loginStatus: MemberLoginStatus;

            switch (response.status)
            {
                case StatusCodes.OK:
                    loginStatus = MemberLoginStatus.SUCCESS;
                    setJWTAndDownloadMemberData((payload as LoginResponseDTO).token);
                    break;

                case StatusCodes.UNAUTHORIZED:
                    loginStatus = MemberLoginStatus.INVALID_CREDENTIALS;
                    break;

                case StatusCodes.BAD_REQUEST:
                    loginStatus = MemberLoginStatus.BAD_REQUEST;
                    break;

                default:
                    throw new Error(`Unexpected status code: ${response.status}`);
            }

            return [ loginStatus, payload ];
        },

        getMemberDataAsync: async (refresh: boolean = false): Promise<DownloadMemberDataResponse> =>
        {
            // Undefined means that it is downloading data
            setState({ memberData: undefined });

            if (refresh || memberDataPromise == undefined)
            {
                memberDataPromise = downloadMemberDataAsync();
            }

            return await memberDataPromise;
        },

        logoutMember: () =>
        {
            notifications.clean();

            notifications.show(
            {
                title: "Logged out",
                message: "You have been successfully logged out.",
            });

            localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
            setState({ memberData: null });

            const returnNullPromise = async () => null;
            memberDataPromise = returnNullPromise();
        }
    }));

const setJWTAndDownloadMemberData = (jwt: string) =>
{
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, jwt);

    // We don't really need to await it, just ensure that it starts downloading Member data.
    useMemberData.getState().getMemberDataAsync(true).then();
}

const downloadMemberDataAsync = async (): Promise<DownloadMemberDataResponse> =>
{
    // TODO: Investigate why this is the case.
    // Yield here, it seems like AppLoader have trouble detecting updated state
    // if we take the fast path, that is, setting state to null should there be no JWT to begin with.
    // Without yielding, AppLoader's memberData state is perpetually stuck at undefined should we not have a JWT.
    await new Promise(resolve => setTimeout(resolve, 0));

    let result: MemberDTO | ErrorDTO | null = null;

    if (localStorage.getItem(JWT_LOCAL_STORAGE_KEY) !== null)
    {
        const response = await fetch(
            EndpointConstants.MEMBERS_ME,
            appendJWTHeader(constructGET())
        );

        result = await response.json();

        if (!response.ok)
        {
            if (response.status !== StatusCodes.UNAUTHORIZED)
            {
                showNotification(
                {
                    title: "Error",
                    message: (result as ErrorDTO).errors[0].message,
                });
            }

            result = null;
        }
    }

    result = result as (MemberDTO | null);

    useMemberData.setState({ memberData: result });

    return result;
}

export const appendJWTHeader = (requestInit: RequestInit): RequestInit =>
{
    const TOKEN = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

    if (TOKEN != null)
    {
        (requestInit.headers as Headers).append("Authorization", `Bearer ${TOKEN}`);
    }

    return requestInit;
}

export const appendQueryParams = (baseAddress: string, dto: object): string =>
{
    const queryParams = queryString.stringify(dto);

    const url = new URL(baseAddress);

    url.search = queryParams;

    return url.toString();
}
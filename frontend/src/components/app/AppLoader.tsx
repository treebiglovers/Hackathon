import { useEffect, Fragment } from "react";
import { useMemberData } from "@app/services/MemberService";
import { CenteredImage } from "@app/components/images/CenteredImage";
import { AssetPathConstants } from "@app/constants/AssetPathConstants";
import { useShallow } from "zustand/react/shallow";
import { PromiseHelpers } from "@app/helpers/PromiseHelpers";

export const AppLoader = ({ children }: any) =>
{
    const [ userData, getMemberDataAsync ] = useMemberData(
        useShallow(
            state =>
            [
                state.memberData,
                state.getMemberDataAsync,
            ]
        )
    );

    useEffect(() =>
    {
        PromiseHelpers.propagateErrorsToNotificationSystem(
            getMemberDataAsync()
        ).then()
    }, [ ]); // Empty deps array means this effect will only run once

    if (userData === undefined)
    {
        return <CenteredImage src={AssetPathConstants.JanaWaddleSm0l} />;
    }

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
import { Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './FeaturesCard.module.css';
import { PlaceHolderHelpers } from '@app/helpers/PlaceHolderHelpers';
import { TiStarFullOutline } from "react-icons/ti";
import { MemberDTO } from "@common/dtos/members/MemberDTO.ts";
import { useGetMemberRatingDataAsync } from "@app/apis/MemberAPIs.ts";
import { CenteredImage } from "@app/components/images/CenteredImage.tsx";
import { ErrorComponent } from "@app/components/errors/ErrorComponent.tsx";
import { AssetPathConstants } from "@app/constants/AssetPathConstants.ts";
import { useMemberData } from "@app/services/MemberService.ts";

interface FeaturesCardProps
{
    memberDTO: MemberDTO;
}

export function FeaturesCard({ memberDTO }: FeaturesCardProps)
{
    const 
    {
        isLoading,
        isError,
        error,
        data,
    } = useGetMemberRatingDataAsync(memberDTO.id!);
    
    const memberData = useMemberData(
        state => state.memberData
    );

    if (isLoading)
    {
        return <CenteredImage src={AssetPathConstants.JanaWaddleSm0l} />;
    }

    if (isError)
    {
        return (
            <ErrorComponent
                errorCode={0}
                errorMessage={error.message}
            />
        );
    }
    
    const ratingData = data!;
    
    const totalReviews = ratingData.totalCount;

    const averageRating = ratingData.totalCount !== 0 ?
        (ratingData.totalRating / totalReviews).toFixed(1) :
        0;
    
    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src={memberDTO.avatarURL ?? PlaceHolderHelpers.generatePlaceholderURL(100, 100)} />
            </Card.Section>

            <Group justify="space-between" mt="md" align="center"> {/* Align items vertically */}
                <div>
                    <Text fw={500} fz='l'>{memberDTO.name}</Text>
                    {/*<Text fz="xs" c="dimmed">*/}
                    {/*  SkibidiToilet@gmail.com*/}
                    {/*</Text>*/}
                </div>

                <Group align="left">
                    <Text fz="md" c="dimmed" style={{ marginRight: -10 }}>
                        {averageRating}
                    </Text>
                    <TiStarFullOutline size={22} style={{ marginTop: 1 }} color='#ebd534'/>
                    <Text fz="md" c="dimmed" style={{ marginLeft: -10 }}>
                        | {totalReviews} Reviews
                    </Text>
                </Group>
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text fz="xl" c="black" className={classes.label}>
                    Description
                </Text>
                <Text c='red' fw={700} fz="lg">
                    ( Unavailable )
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={30}>
                    <Button 
                        radius="x1"
                        style={{ flex: 1, marginTop: 100, height: 50 }}
                        disabled={memberData === null}
                    >
                        Chat Now
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}

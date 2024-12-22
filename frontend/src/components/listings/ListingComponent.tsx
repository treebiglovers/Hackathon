import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from "@tabler/icons-react";
import { Badge, Button, Card, Container, SimpleGrid, Center, Group, Image, Text } from "@mantine/core";
import classes from "./ListingComponent.module.css";
import { useGetMemberListingsAsync } from "@app/apis/ListingAPIs.ts";
import { CenteredImage } from "@app/components/images/CenteredImage.tsx";
import { Fragment } from "react";
import { ErrorComponent } from "@app/components/errors/ErrorComponent.tsx";
import { MemberListingDTO } from "@common/dtos/members/listings/MemberListingDTO.ts";
import { AssetPathConstants } from "@app/constants/AssetPathConstants";
import { PlaceHolderHelpers } from "@app/helpers/PlaceHolderHelpers.ts";

const mockdata = 
[
    { label: '4 passengers', icon: IconUsers },
    { label: '100 km/h in 4 seconds', icon: IconGauge },
    { label: 'Automatic gearbox', icon: IconManualGearbox },
    { label: 'Electric', icon: IconGasStation },
];

export const Listing = () =>
{
    const features = mockdata.map((feature) => (
        <Center key={feature.label}>
            <feature.icon size={16} className={classes.icon} stroke={1.5} />
            <Text size="xs">{feature.label}</Text>
        </Center>
    ));

    const
    {
        isLoading,
        isError,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useGetMemberListingsAsync();

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
    
    const constructListing = (memberListingDTO: MemberListingDTO) =>
    {
        const iconURL = memberListingDTO.iconURL ?? PlaceHolderHelpers
            .generatePlaceholderURL(460, 200);
        
        return (
            <Card withBorder radius="md" className={classes.card}>
                <Card.Section p={0} className={classes.imageSection}>
                    <Image
                        src={iconURL}
                        alt={memberListingDTO.title}
                    />
                </Card.Section>

                <Group justify="space-between" mt="md">
                    <div>
                        <Text fw={500}>{memberListingDTO.title}</Text>
                        <Text fz="xs" c="dimmed">
                            {memberListingDTO.description}
                        </Text>
                    </div>
                    <Badge variant="outline">25% off</Badge>
                </Group>

                <Card.Section className={classes.section} mt="md">
                    <Text fz="sm" c="dimmed" className={classes.label}>
                        Basic configuration
                    </Text>

                    <Group gap={8} mb={-8}>
                        {features}
                    </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Group gap={30}>
                        <div>
                            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                                $168.00
                            </Text>
                            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                                per day
                            </Text>
                        </div>

                        <Button radius="xl" style={{ flex: 1 }}>
                            Rent now
                        </Button>
                    </Group>
                </Card.Section>
            </Card>
        );
    }

    const listing = data!.pages.map((group, i) =>
        <Fragment key={i}>
            {group.map(constructListing)}
        </Fragment>
    );

    return (
        <Container py="xl">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {listing}
            </SimpleGrid>
        </Container>
    );
}
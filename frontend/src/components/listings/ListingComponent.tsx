import { IconUsers } from "@tabler/icons-react";
import { Badge, Button, Card, Container, SimpleGrid, Center, Group, Image, Text, Box, Stack } from "@mantine/core";
import classes from "./ListingComponent.module.css";
import { useGetMemberListingsAsync } from "@app/apis/ListingAPIs.ts";
import { CenteredImage } from "@app/components/images/CenteredImage.tsx";
import { Fragment } from "react";
import { ErrorComponent } from "@app/components/errors/ErrorComponent.tsx";
import { MemberListingDTO } from "@common/dtos/members/listings/MemberListingDTO.ts";
import { AssetPathConstants } from "@app/constants/AssetPathConstants";
import { PlaceHolderHelpers } from "@app/helpers/PlaceHolderHelpers.ts";

export const Listing = () =>
{
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
    
    const constructListing = (listingDTO: MemberListingDTO) =>
    {
        const iconURL = listingDTO.iconURL ?? PlaceHolderHelpers
            .generatePlaceholderURL(460, 200);
        
        const priceText = listingDTO.price === null ?
            "Free!" :
            `$${listingDTO.price}`;
        
        const requiredStars = (
            <Center key="RequiredStars">
                <IconUsers size={16} className={classes.icon} stroke={1.5} />
                <Text size="xs">Required Stars: {listingDTO.requiredStars ?? "NIL"}</Text>
            </Center>
        );
        
        return (
            <Card withBorder radius="md" className={classes.card}>
                <Card.Section p={0} className={classes.imageSection}>
                    <Image
                        src={iconURL}
                        alt={listingDTO.title}
                    />
                </Card.Section>

                <Group justify="space-between" mt="md">
                    <div>
                        <Text fw={500}>{listingDTO.title}</Text>
                        <Text fz="xs" c="dimmed">
                            {listingDTO.description}
                        </Text>
                    </div>
                    <Badge variant="outline">Healthcare</Badge>
                </Group>

                <Card.Section className={classes.section} mt="md">
                    <Text fz="sm" c="dimmed" className={classes.label}>
                        Info
                    </Text>

                    <Group gap={8} mb={-8}>
                        {requiredStars}
                    </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Group gap={30}>
                        <div>
                            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                                {priceText}
                            </Text>
                        </div>

                        <Button radius="xl" style={{ flex: 1 }}>
                            View Listing 
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

    const buttonText = !(isFetching || isFetchingNextPage) ?
        (hasNextPage ? "Load More" : "Nothing more to load") :
        "Loading more...";

    return (
        <Stack align="center" p="xl">
            <Container py="xl">
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    {listing}
                </SimpleGrid>
            </Container>
            
            <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {buttonText}
            </Button>
        </Stack>
    );
}
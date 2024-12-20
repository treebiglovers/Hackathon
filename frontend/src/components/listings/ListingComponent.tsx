import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from "./ListingComponent.module.css";

export const Listing = () =>
{
    
    const singleBadge =  (
        <Badge variant="light" key={"hi"}>
            Hi
        </Badge>
    );

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src="https://avatars.githubusercontent.com/u/74057874?v=4" height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        Bye
                    </Text>
                    <Badge size="sm" variant="light">
                        {singleBadge}
                    </Badge>
                </Group>
                <Text fz="sm" mt="xs">
                    Some description
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group gap={7} mt={5}>
                    {singleBadge}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
}
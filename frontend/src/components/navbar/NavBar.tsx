import { useState } from "react";

import
{
    IconChevronDown,
    IconLogout,
    IconSettings,
} from "@tabler/icons-react";

import cx from "clsx";

import
{
    Menu,
    Avatar,
    Container,
    Group,
    Tabs,
    Text,
    UnstyledButton,
    Image, Button,
} from "@mantine/core";

// import { useDisclosure } from "@mantine/hooks";

import classes from "./NavBar.module.css";
import { AssetPathConstants } from "@app/constants/AssetPathConstants.ts";
import { useMemberData } from "@app/services/MemberService.ts";
import { useShallow } from "zustand/react/shallow";
import { Link } from "@tanstack/react-router";

const DEFAULT_TAB: TabData = { name: "CCA List", value: "/" };

type TabData =
{
    name: string;
    value: string;
}

const tabs: TabData[] =
[
    DEFAULT_TAB,
    { name: "Member List", value: "/members" },
];

export const NavBar = () =>
{
    // const [opened, { toggle }] = useDisclosure(false);

    // TODO: Work on this
    const tabsEnabled = false;

    // https://github.com/pmndrs/zustand?tab=readme-ov-file#selecting-multiple-state-slices
    const [ memberData, logoutMember ] = useMemberData(
        useShallow(
            state =>
            [
                state.memberData,
                state.logoutMember,
            ]
        )
    );

    const [ userMenuOpened, setUserMenuOpened ] = useState(false);

    const items = tabs.map((tabData) => (
        <Tabs.Tab value={tabData.value} key={tabData.value}>
            {tabData.name}
        </Tabs.Tab>
    ));

    const memberDropdown = memberData ? (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group gap={7}>
                        <Avatar src={memberData.avatarURL} alt="Member Avatar" radius="xl" size={20} />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {memberData.name}
                        </Text>
                        <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                    Account settings
                </Menu.Item>

                <Menu.Item
                    leftSection={<IconLogout size={16} stroke={1.5} />}
                    onClick={logoutMember}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    ) :
    (
        <Link to="/login">
            <Button>Login</Button>
        </Link>
    );

    const tpLogo = (
        <Link to="/">
            <Image
                src={AssetPathConstants.TPLogo}
                height={28}
            />
        </Link>
    );

    const tabsElement = tabsEnabled ? (
        <Container size="md">
            <Tabs
                defaultValue={DEFAULT_TAB.value}
                variant="outline"
                visibleFrom="sm"
                classNames=
                {
                    {
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }
                }
            >
                <Tabs.List>{items}</Tabs.List>
            </Tabs>
        </Container>
    ) : null;

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Group justify="space-between">
                    {tpLogo}

                    {/*<Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />*/}

                    {memberDropdown}
                </Group>
            </Container>

            {tabsElement}
        </div>
    );
}
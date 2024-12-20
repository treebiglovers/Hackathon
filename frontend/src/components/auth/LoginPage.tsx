import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import classes from "./LoginPage.module.css";
import { MemberLoginStatus, useMemberData } from "@app/services/MemberService";
import { Navigate } from "@tanstack/react-router"
import { useState, ReactNode } from "react";
import { LoginRequestDTO, LoginRequestDTOSchema } from "@common/dtos/auth/LoginRequestDTO";
import { useShallow } from "zustand/react/shallow";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import { notifications } from "@mantine/notifications";
import { default as parseHTML } from "html-react-parser";


export const LoginPage = () =>
{
    const [ memberData, loginMemberAsync ] = useMemberData(
        useShallow(
            state =>
            [
                state.memberData,
                state.loginMemberAsync,
            ]
        )
    );

    const [ email, setEmail ] = useState('');
    const [ emailError, setEmailError ] = useState<ReactNode | null>(null);

    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState<ReactNode | null>(null);

    const [ disabled, setDisabled ] = useState(false);

    if (memberData)
    {
        // Replace replaces current page in history stack instead of appending to it
        return <Navigate to='/' replace/>;
    }

    // TODO: Use react query
    const tryLogin = async () =>
    {
        const tryLoginInternal = async (loggingInNotificationID: string) =>
        {
            setDisabled(true);

            setEmailError(null);
            setPasswordError(null);

            const mapErrors = (errorDTO: ErrorDTO) =>
            {
                // TODO: Investigate this
                // Zod paths can be numbers too, apparently
                const map = new Map<string | number, string>(
                    [
                        [ "email", "" ],
                        [ "password", "" ],
                    ]
                );

                errorDTO.errors.forEach(error =>
                {
                    const path = error.path[0];

                    map.set(path, `${map.get(path)}${error.message}<br>`);
                });

                const emailErrors = map.get("email")!;
                const passwordErrors = map.get("password")!;

                const constructErrorElements = (errors: string) =>
                {
                    if (errors.length == 0)
                    {
                        return null;
                    }

                    // Having the trailing <br> doesn't seem to matter at all...
                    return parseHTML(`<div>${errors}</div>`);
                };

                setEmailError(constructErrorElements(emailErrors));
                setPasswordError(constructErrorElements(passwordErrors));
            };

            const rawDTO: LoginRequestDTO = { email, password };

            let loginDTO = LoginRequestDTOSchema.safeParse(rawDTO);

            if (!loginDTO.success)
            {
                mapErrors(ErrorDTO.fromZodError(loginDTO.error));
                return;
            }

            try
            {
                const [ memberLoginStatus, result ] = await loginMemberAsync(loginDTO.data!);

                switch (memberLoginStatus)
                {
                    case MemberLoginStatus.SUCCESS:
                        notifications.update(
                        {
                            id: loggingInNotificationID,
                            color: "green",
                            title: "Logged in",
                            message: "You have been successfully logged in!",
                        });

                        notifications.update

                        return;

                    case MemberLoginStatus.INVALID_CREDENTIALS:
                        notifications.show(
                        {
                            color: "red",
                            title: "Invalid credentials",
                            message: "The email and / or password you entered is incorrect.",
                        });
                        return;

                    case MemberLoginStatus.BAD_REQUEST:
                        mapErrors(result as ErrorDTO);
                        return;
                }
            }

            catch (error)
            {
                console.error(error);
            }
        };

        setDisabled(true);

        notifications.clean();

        const loggingInNotificationID = notifications.show(
        {
            title: "Logging in",
            message: "Please wait while we log you in...",
        });

        await tryLoginInternal(loggingInNotificationID);

        setDisabled(false);
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>

            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={event => setEmail(event.currentTarget.value)}
                    error={emailError}
                    disabled={disabled}
                    required
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    value={password}
                    onChange={event => setPassword(event.currentTarget.value)}
                    error={passwordError}
                    disabled={disabled}
                    mt="md"
                    required
                />

                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button
                    fullWidth mt="xl"
                    onClick={tryLogin}
                >
                    Login
                </Button>
            </Paper>
        </Container>
    );
}
import { Button, Container, Group, Text, Title } from "@mantine/core";
import classes from "./ErrorComponent.module.css";
import { Link } from "@tanstack/react-router";

export interface ErrorComponentProps
{
    errorCode: number;
    
    errorTitle?: string;
    
    errorMessage: string;
}

export const ErrorComponent = (
    { errorCode, errorTitle = "An error has occurred", errorMessage }: ErrorComponentProps
) =>
{
    return (
        <Container className={classes.root}>
            <div className={classes.label}>{errorCode}</div>
            
            <Title className={classes.title}>{errorTitle}</Title>
            
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                {errorMessage}
            </Text>
            
            <Group justify="center">
                <Link to={'/'}>
                    <Button variant="subtle" size="md">
                        Take me back to home page
                    </Button>
                </Link>
            </Group>
        </Container>
    );
}
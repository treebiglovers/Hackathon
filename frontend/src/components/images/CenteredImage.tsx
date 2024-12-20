import { Box, Image } from "@mantine/core";
import { BaseImageProps } from "@app/components/images/BaseImageProps.ts";

export interface CenteredImageProps extends BaseImageProps
{
    maxWidth?: string;
    maxHeight?: string;
}

export const CenteredImage = (
    { src, alt, maxWidth = "100%", maxHeight = "100vh" }: CenteredImageProps
) =>
{
    return (
        <Box
            style=
            {
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                }
            }
        >
            <Image
                src={src}
                alt={alt}
                fit="contain"
                style={{ maxWidth, maxHeight }}
            />
        </Box>
    );
};

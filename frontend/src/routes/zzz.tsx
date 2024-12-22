import { createFileRoute } from "@tanstack/react-router";
import { CategoryGrid } from "@app/components/listings/category/CategoryGrid";
import { Box } from "@mantine/core";

export const Route = createFileRoute('/zzz')({
  component: () => 
  {
    return (
      <Box>
        <CategoryGrid />
      </Box>
    );
  }
});

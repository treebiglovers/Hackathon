import { createFileRoute } from "@tanstack/react-router";
import { Box, Text } from "@mantine/core";
import { useMemberData } from "@app/services/MemberService.ts";

export const Route = createFileRoute('/')({
  component: () =>
  {
      const memberData = useMemberData(
          state => state.memberData,
      );
      
      return (
          <Box>
              <Text>Listing</Text>
              {memberData !== null ? <Text>Logged in</Text> : <Text>Not logged in</Text>}
          </Box>
      );
  }
});

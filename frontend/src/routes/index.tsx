import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@app/components/listings/ListingComponent.tsx";

export const Route = createFileRoute('/')({
  component: () =>
  {
      // const memberData = useMemberData(
      //     state => state.memberData,
      // );
      //
      // return (
      //     <Box>
      //         <Text>Listing</Text>
      //         {memberData !== null ? <Text>Logged in</Text> : <Text>Not logged in</Text>}
      //     </Box>
      // );
      
      return <Listing />;
  }
});

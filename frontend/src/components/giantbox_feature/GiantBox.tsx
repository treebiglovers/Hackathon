import { Card, Text } from '@mantine/core';  
import classes from './GiantBox.module.css';
import { MemberListingDTO } from "@common/dtos/members/listings/MemberListingDTO.ts";  

interface GiantBoxProps
{
    memberListingDTO: MemberListingDTO;
}

export function GiantBox({ memberListingDTO }: GiantBoxProps)
{  
  return (
    <Card withBorder radius="md" className={classes.giantBox}>  
      <div className={classes.details}>  
        <h2>Description</h2>
        <p>{memberListingDTO.description}</p>
      </div>
      {/*<div className={classes.description}>  */}
      {/*  <h3>Description</h3>*/}
      {/*  <p>This is the description section where whoever can provide additional details or explanation.</p>*/}
      {/*</div>*/}
      <div className={classes.extraInfo}>
        <div>
          <Text fw={600}>Listed Date:</Text>
          <Text>22nd December 2024</Text>
        </div>
        <div>
          <Text fw={600}>Status:</Text>
          <Text c="green">Active</Text>
        </div>
        <div>
          <Text fw={600}>Min Stars Needed:</Text>
          <Text>4.5 stars (100+ reviews)</Text>
        </div>
        <div>
          <Text fw={600}>Category:</Text>
          <Text>Electronics</Text>
        </div>
      </div>
    </Card>
  );
}

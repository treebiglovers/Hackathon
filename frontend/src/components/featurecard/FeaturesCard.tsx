import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { Button, Card, Center, Group, Image, Text } from '@mantine/core';
import classes from './FeaturesCard.module.css';
import { PlaceHolderHelpers } from '@app/helpers/PlaceHolderHelpers';
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti"; // Import star icons

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

export function FeaturesCard() {
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={16} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={PlaceHolderHelpers.generatePlaceholderURL(100, 100)} />
      </Card.Section>

      <Group justify="space-between" mt="md" align="center"> {/* Align items vertically */}
        <div>
          <Text fw={500} fz='l'>Markus Zong</Text>
          <Text fz="xs" c="dimmed">
            SkibidiToilet@gmail.com
          </Text>
        </div>

        <Group align="left"> 
        <Text fz="md" c="dimmed" style={{ marginRight: -10 }}>
            4.3
        </Text>
        <TiStarFullOutline size={22} style={{ marginTop: 1 }} color='#ebd534'/>
        <Text fz="md" c="dimmed" style={{ marginLeft: -10 }}>
            | 123 Reviews
        </Text>
        </Group>
    </Group>

    <Card.Section className={classes.section} mt="md">
        <Text fz="xl" c="black" className={classes.label}>
            Idea Later
        </Text>
        <Text c='red' fw={700} fz="lg">
            Cook later
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <Button radius="x1" style={{ flex: 1, marginTop: 100, height: 50 }}>
            Chat Now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

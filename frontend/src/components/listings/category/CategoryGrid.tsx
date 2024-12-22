// import React, { useEffect, useState } from 'react';
// import {
//     IconBuildingBank,
//     IconCreditCard,
//     IconReceiptRefund,
//     IconRepeat,
//   } from '@tabler/icons-react';
//   import {
//     Card,
//     Group,
//     SimpleGrid,
//     Text,
//     UnstyledButton,
//     useMantineTheme,
//   } from '@mantine/core';
//   import { Carousel } from '@mantine/carousel';
//   import classes from './CategoryGrid.module.css';
//   import '@mantine/carousel/styles.css';
//   import CategoryComponent from './ToggleComponent';
//  
//   const mockdata = [
//     { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
//     { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
//     { title: 'Transfers', icon: IconRepeat, color: 'blue' },
//     { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
//     { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
//   ];
//  
//   export function CategoryGrid() {
//     const theme = useMantineTheme();
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [hasLoaded, setHasLoaded] = useState(false);
//
//     useEffect(() => {
//         if (!hasLoaded) {
//             setSelectedCategory('Credit cards'); // Default category change from this placeholder
//             setHasLoaded(true);
//         }
//     }, [hasLoaded]);
//
//     const handleCategoryChange = (category: string) => {
//         setSelectedCategory((prev) => (prev === category ? null : category));
//         };
//  
//     const items = mockdata.map((item) => (
//       <UnstyledButton key={item.title} className={classes.item} onClick={() => handleCategoryChange(item.title)}>
//         <item.icon color={theme.colors[item.color][6]} size={32} />
//         <Text size="xs" mt={7}>
//           {item.title}
//         </Text>
//       </UnstyledButton>
//     ));
//  
//     const category = (
//       <Card withBorder radius="md" className={classes.card}>
//         <Group justify="space-between">
//           <Text className={classes.title}>Services</Text>
//         </Group>
//         <SimpleGrid cols={5} mt="md">
//           {items}
//         </SimpleGrid>
//       </Card>
//     );
//  
//     return (
//     <div>
//       <Carousel withIndicators height={200}>
//         <Carousel.Slide>{category}</Carousel.Slide>
//         <Carousel.Slide>{category}</Carousel.Slide>
//       </Carousel>
//         {selectedCategory && ( <CategoryComponent categoryName={selectedCategory} />
//     )}
//     </div>
//     );
// }
//  
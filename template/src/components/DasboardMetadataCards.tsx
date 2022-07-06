import { SimpleGrid, Center } from "@chakra-ui/react";
import { MetadataCard } from "./MetadataCard";

type Item = {
  title: string;
  items: any;
};

export const DashboardMetadataCards = ({ items }: { items: Item[] }) => {
  return (
    <Center>
      <SimpleGrid columns={2} spacing={10}>
        {items.map((item) => (
          <MetadataCard title={item.title} items={item.items} />
        ))}
      </SimpleGrid>
    </Center>
  );
};

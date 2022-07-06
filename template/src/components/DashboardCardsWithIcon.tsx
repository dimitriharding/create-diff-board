import { Wrap, WrapItem } from "@chakra-ui/react";
import { CardWithIcon } from "./CardWithIcon";

export const DashboardCardsWithIcon = ({
  items,
  noShadow,
  ...rest
}: {
  items: any;
  noShadow: boolean;
}) => {
  return (
    <Wrap mx="10" mt="5" spacing={8} justify="center">
      {items.map((item: any, index: number) => (
        <WrapItem key={index}>
          <CardWithIcon noShadow={noShadow} {...item} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

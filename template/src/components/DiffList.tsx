import { Accordion, Tag } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { DiffRow } from "./DiffRow";
import { Collapse, Item } from "./Collaspe";
type IDiff = {
  testCount: number;
  diffCount: number;
  items: [];
};

interface IDiffListProps {
  diffResults: {
    [key: string]: IDiff;
  };
}

export const DiffList = ({ diffResults }: IDiffListProps) => {
  const items: any = Object.keys(diffResults).map((group) => {
    const feature = diffResults[group];
    const extra = [
      <Tag colorScheme={"blue"}>{feature.testCount}</Tag>,
      <Tag colorScheme={"green"}>{feature.testCount - feature.diffCount}</Tag>,
      <Tag colorScheme={"red"}>{feature.diffCount}</Tag>,
    ];
    return {
      name: group,
      textColor: feature.diffCount ? "red" : null,
      icon: feature.diffCount ? (
        <WarningIcon color={"red.300"} />
      ) : (
        <CheckCircleIcon color={"green.300"} />
      ),
      render: () => {
        return (
          <Accordion size={"sm"} allowMultiple w="full">
            {diffResults[group].items.map((diff, index) => {
              return <DiffRow key={index} diff={diff} />;
            })}
          </Accordion>
        );
      },
      extra,
    };
  });
  return <Collapse items={items} />;
};

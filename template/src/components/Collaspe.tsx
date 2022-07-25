import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useColorModeValue,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type Item = {
  name: string;
  icon: ReactNode;
  textColor?: string;
  render: () => ReactNode;
  extra: [];
};

interface ICollapseProps {
  items: Item[];
}

export const Collapse = ({ items }: ICollapseProps) => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      w={"90%"}
      shadow="md"
      borderWidth="1px"
      borderRadius={10}
    >
      <Accordion size={"sm"} allowToggle>
        {items.map((item) => {
          return (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Flex alignItems={"center"}>
                      {item.icon}
                      <Text
                        ml={2}
                        fontWeight={"semibold"}
                        color={`${item.textColor}.500`}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  </Box>
                  {item.extra.map((ex, index) => (
                    <Box mr={1} key={index}>
                      {ex}
                    </Box>
                  ))}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.render()}</AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

import {
  Stack,
  List,
  ListItem,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

type Item = {
  name: string;
  value: string;
};

interface IMetadataCard {
  title: string;
  items: Item[];
}

export const MetadataCard = ({ title, items }: IMetadataCard) => {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: "100%", md: "400px" }}
      height={{ sm: "180px", md: "8rem" }}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"md"}
      padding={2}
    >
      <Center>
        <Text
          fontSize={{ base: "12px", lg: "14px" }}
          color={useColorModeValue("gray.500", "gray.500")}
          fontWeight={"500"}
          textTransform={"uppercase"}
          mb={"3"}
        >
          {title}
        </Text>
      </Center>
      <List spacing={2}>
        {items.map((item) => {
          return (
            <ListItem>
              <Text as={"span"} fontWeight={"hairline"}>
                {item.name}
                {": "}
              </Text>
              {item.value}
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

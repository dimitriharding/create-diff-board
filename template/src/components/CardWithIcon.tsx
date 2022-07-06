import {
  Box,
  Grid,
  GridItem,
  Text,
  useColorModeValue as mode,
  Icon,
} from "@chakra-ui/react";

interface ICardWithIcon {
  title: string;
  value: string;
  color: string;
  icon?: null | any;
  noShadow: boolean;
}

export const CardWithIcon = ({
  title,
  value,
  color,
  icon,
  noShadow,
  ...rest
}: ICardWithIcon) => {
  return (
    <Box
      w="300px"
      p={10}
      boxShadow={noShadow ? "lg" : ""}
      border={"1px solid"}
      borderColor={`${color}.200`}
      borderRadius="10px"
      {...rest}
    >
      <Grid
        alignItems="center"
        justifyContent="center"
        gap="4"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
      >
        <GridItem>
          <Text fontWeight="bold" color={`${color}.500`}>
            {title}
          </Text>
          <Text
            mb="0"
            color={mode("gray.500", "gray.300")}
            fontWeight="bold"
            fontSize="xl"
          >
            {value}
          </Text>
        </GridItem>
        <GridItem colEnd={6}>
          <Icon w={10} h={10} as={icon} color={`${color}.300`} />
        </GridItem>
      </Grid>
    </Box>
  );
};

import { Box, Heading, Text } from "@chakra-ui/react";
export const Feature = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Box>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};

import { Container, Alert, AlertIcon, Text } from "@chakra-ui/react";

export const NoDiffFound = () => {
  return (
    <Container>
      <Alert
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"md"}
        status="success"
        flexDir={"column"}
      >
        <AlertIcon />
        <Text mt={5} fontSize={"sm"}>
          No Diff Found
        </Text>
      </Alert>
    </Container>
  );
};

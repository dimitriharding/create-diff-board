import { Text } from "@chakra-ui/react";
import { utcToZonedTimeFormat } from "../utils";
export const GeneratedAt = ({ date }: { date: string }) => {
  return (
    <Text as={"em"} pr={5} textAlign="right">
      Generated at {utcToZonedTimeFormat(date)}
    </Text>
  );
};

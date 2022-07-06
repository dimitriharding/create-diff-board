import { List, Box, Text, BoxProps } from "@chakra-ui/react";
import { Step } from "./Step";
import { Scenario as TestScenario } from "../../types/index";

export interface IScenario {
  scenarioData: TestScenario;
  title: string;
}

export const Scenario = ({
  scenarioData,
  title,
  ...props
}: IScenario & BoxProps) => {
  return (
    <Box p={5} {...props}>
      <Text color={"gray.500"}>
        {title} - {scenarioData.name}
      </Text>
      <List>
        {scenarioData?.steps.map((step) => {
          if (!step?.hidden) return <Step testData={step} />;
          return null;
        })}
      </List>
    </Box>
  );
};

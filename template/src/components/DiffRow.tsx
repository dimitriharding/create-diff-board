import { useState, useEffect } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  SimpleGrid,
  AlertIcon,
  Alert,
  useColorMode,
  Stack,
  Text,
} from "@chakra-ui/react";
//@ts-ignore
import ReactDiffViewer from "react-diff-viewer";
import { Scenario } from "./Cucumber/Scenario";
import { CurlCard } from "./CurlCard";
import { Scenario as TestScenario, Spec } from "../types/index";

enum DiffMethod {
  CHARS = "diffChars",
  WORDS = "diffWords",
  WORDS_WITH_SPACE = "diffWordsWithSpace",
  LINES = "diffLines",
  TRIMMED_LINES = "diffTrimmedLines",
  SENTENCES = "diffSentences",
  CSS = "diffCss",
}

interface DiffRowProps {
  diff: {
    actual: Spec;
    expected: Spec;
    diff: string;
    diffFound: boolean;
    name: string;
    group: string;
    cucumberReports: {
      [key: string]: {
        scenario: TestScenario;
      };
    };
  };
}

export const DiffRow = ({ diff }: DiffRowProps) => {
  const { colorMode } = useColorMode();
  const [diffJson, setDiffJson] = useState<Boolean | null>(null);

  useEffect(() => {
    setDiffJson(diff?.diffFound);
  }, [diff]);

  return (
    <AccordionItem>
      <h2>
        <Alert p={0} status={diff.diffFound ? "error" : "success"}>
          <AccordionButton>
            <AlertIcon />
            <Box flex="1" textAlign="left">
              {diff.name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Alert>
      </h2>
      <AccordionPanel w="full" pb={4}>
        <SimpleGrid columns={1} spacing={4}>
          <Box overflowY={"scroll"} overflow={"auto"}>
            <Stack dir={"vertical"}>
              {
                <Stack dir={"vertical"}>
                  <Text textAlign={"center"}>Diff Comparison</Text>
                  <ReactDiffViewer
                    oldValue={JSON.stringify(
                      { response: diff?.actual?.response },
                      null,
                      1
                    )}
                    newValue={JSON.stringify(
                      { response: diff?.expected?.response },
                      null,
                      1
                    )}
                    splitView={true}
                    rightTitle={`expected - ${diff?.expected?.testName}`}
                    leftTitle={`actual - ${diff?.actual?.testName}`}
                    useDarkTheme={colorMode === "dark"}
                    compareMethod={DiffMethod.WORDS}
                    showDiffOnly={true}
                  />
                </Stack>
              }
              <Text textAlign={"center"}>API Test</Text>
              <SimpleGrid columns={2}>
                <Scenario
                  border={"1px solid"}
                  borderColor={`gray.500`}
                  borderBottomLeftRadius={"2xl"}
                  title="Actual Test"
                  scenarioData={diff.cucumberReports.actual.scenario}
                />
                <Scenario
                  border={"1px solid"}
                  borderColor={`gray.500`}
                  borderBottomRightRadius={"2xl"}
                  title="Expected Test"
                  scenarioData={diff.cucumberReports.expected.scenario}
                />
              </SimpleGrid>
              <Text textAlign={"center"}>
                {"CURL Commands (click to copy)"}
              </Text>
              <SimpleGrid columns={2} spacing={2}>
                <CurlCard
                  testName={`[actual] ${diff.group} -  ${diff.name}`}
                  curl={diff.actual.curl}
                />
                <CurlCard
                  testName={`[expected] ${diff.group} -  ${diff.name}`}
                  curl={diff.expected.curl}
                />
              </SimpleGrid>
            </Stack>
          </Box>
        </SimpleGrid>
      </AccordionPanel>
    </AccordionItem>
  );
};

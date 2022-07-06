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
import Prism from "prismjs";
import SyntaxHighlighter from "react-syntax-highlighter";
//@ts-ignore
import ReactDiffViewer from "react-diff-viewer";
import { Scenario } from "./Cucumber/Scenario";
import { Scenario as TestScenario } from "../types/index";

interface DiffRowProps {
  diff: {
    actual: string;
    expected: string;
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
  const [actualJson, setActualJson] = useState<Object | null>(null);
  const [expectedJson, setExpectedJson] = useState<Object | null>(null);
  const [diffJson, setDiffJson] = useState<String | null>(null);
  const [conciseView, setConciseView] = useState(true);

  const getActualData = () => {
    fetch(diff.actual)
      .then((res) => res.json())
      .then((data) => {
        setActualJson(data);
      });
  };

  const getExpectedData = () => {
    fetch(diff.expected)
      .then((res) => res.json())
      .then((data) => {
        setExpectedJson(data);
      });
  };

  const getDiffData = () => {
    fetch(diff.diff)
      .then((res) => res.text())
      .then((data) => {
        setDiffJson(data);
      });
  };

  const JsonDisplay = ({ json }: { json: string }) => {
    return (
      <SyntaxHighlighter language="json">
        {JSON.stringify(json, null, 1)}
      </SyntaxHighlighter>
    );
  };

  const highlightSyntax = (str: any) => (
    <span
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(str, Prism.languages.javascript, "js"),
      }}
    />
  );

  const chighlightSyntax = (str: any) => (
    <span
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(str, Prism.languages.gherkin, "gherkin"),
      }}
    />
  );

  useEffect(() => {
    getActualData();
    getExpectedData();
    getDiffData();
  }, [diff]);

  return (
    <AccordionItem>
      <h2>
        <Alert status={diff.diffFound ? "error" : "success"}>
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
              {diffJson && (
                <Stack dir={"vertical"}>
                  <Text textAlign={"center"}>Diff Comparison</Text>
                  <ReactDiffViewer
                    newValue={
                      JSON.stringify(expectedJson, null, 2) || undefined
                    }
                    oldValue={JSON.stringify(actualJson, null, 2) || undefined}
                    splitView={true}
                    renderContent={highlightSyntax}
                    rightTitle={diff.expected}
                    leftTitle={diff.actual}
                    useDarkTheme={colorMode === "dark"}
                  />
                </Stack>
              )}
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
            </Stack>
          </Box>
        </SimpleGrid>
      </AccordionPanel>
    </AccordionItem>
  );
};

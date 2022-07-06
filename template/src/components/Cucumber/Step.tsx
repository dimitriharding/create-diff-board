import { ListItem, ListIcon, Box } from "@chakra-ui/react";
import {
  HiExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMenu,
} from "react-icons/hi";
import { Step as TestStep } from "../../types/index";
import { msToTime } from "../../utils";

interface IStep {
  testData: TestStep;
}

export const Step = ({ testData }: IStep) => {
  const status = {
    failed: {
      icon: HiOutlineXCircle,
      color: "red.500",
    },
    passed: {
      icon: HiOutlineCheckCircle,
      color: "green.500",
    },
    undefined: {
      icon: HiExclamationCircle,
      color: "yellow.500",
    },
    skipped: {
      icon: HiOutlineMenu,
      color: "blue.500",
    },
  };
  const statusData = status[testData.result.status];
  return (
    <ListItem>
      <ListIcon as={statusData.icon} color={statusData.color} />
      {`${testData.keyword} ${testData.name}`}
      {testData?.result?.status === "undefined" && (
        <Box
          overflow={"auto"}
          p={1}
          ml={10}
          whiteSpace={"pre"}
          fontFamily={"monospace"}
          color={"yellow.500"}
        >
          {`
Undefined. Implement with the following snippet:

  ${testData.keyword.trim()}('${testData.name?.replace(
            /'(.*)'/,
            "{string}"
          )}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
          `}
        </Box>
      )}
      {testData?.result?.error_message && (
        <Box
          overflow={"auto"}
          p={1}
          ml={10}
          whiteSpace={"pre"}
          fontFamily={"monospace"}
          color={"red.200"}
        >
          {testData?.result?.error_message}
        </Box>
      )}
      {testData?.arguments &&
        testData.arguments.map((argument) => (
          <Box p={1} ml={10} whiteSpace={"pre"} fontFamily={"monospace"}>
            {argument.content}
          </Box>
        ))}
    </ListItem>
  );
};

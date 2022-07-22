import SyntaxHighlighter from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Box, useToast } from "@chakra-ui/react";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CurlCard = ({
  curl,
  testName,
}: {
  curl: string;
  testName: string;
}) => {
  const toast = useToast();
  return (
    <Box>
      <CopyToClipboard
        text={curl}
        onCopy={() => {
          toast({
            title: "Curl command copied",
            description: testName,
            status: "success",
            duration: 9000,
          });
        }}
      >
        <SyntaxHighlighter
          language="bash"
          style={github}
          customStyle={{
            borderRadius: "10px",
            padding: "10px",
            background: "rgb(227 224 224)",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          {curl}
        </SyntaxHighlighter>
      </CopyToClipboard>
    </Box>
  );
};

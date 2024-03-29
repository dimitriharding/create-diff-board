import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { HStack, Stack } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  HamburgerIcon,
  SpinnerIcon,
} from "@chakra-ui/icons";
import Iframe from "react-iframe";
import { DiffLayout } from "./components/DiffLayout";
import { Header } from "./components/Header";
import { DashboardCardsWithIcon } from "./components/DashboardCardsWithIcon";
import { DashboardMetadataCards } from "./components/DasboardMetadataCards";
import { Panels } from "./components/Panels";
import { GeneratedAt } from "./components/GeneratedAt";
import { fetchData } from "./utils";

interface IConfig {
  title?: string;
  createdAt: string;
  totalDiffs: number;
  totalTests: number;
  totalPassed: number;
  totalEndpoints: number;
  metadata: {
    [key: string]: {
      env: string;
      url: string;
    };
  };
  tests: [];
}

export const ReportApp = () => {
  const [config, setConfig] = useState<IConfig | null>(null);
  let params = useParams();
  let reportId = params.reportId;

  useEffect(() => {
    fetchData(`/${reportId}/config.json`, (data: any) =>
      setConfig(data as IConfig)
    );
  }, []);

  return (
    <>
      {config && (
        <Stack minH="100vh" minW="100vw">
          <Header title={config?.title || "Regression Tests"} />
          <GeneratedAt date={config?.createdAt} />
          <Panels
            tabs={[
              {
                title: "Diff Report",
                panel: (
                  <Stack spacing={5}>
                    <DashboardCardsWithIcon
                      noShadow={false}
                      items={[
                        {
                          title: "Tests",
                          value: config?.totalTests,
                          icon: HamburgerIcon,
                          color: "blue",
                        },
                        {
                          title: "Passes",
                          value: config?.totalTests - config?.totalDiffs,
                          icon: CheckCircleIcon,
                          color: "green",
                        },
                        {
                          title: "Diffs",
                          value: config?.totalDiffs,
                          icon: WarningIcon,
                          color: "red",
                        },
                        {
                          title: "Endpoints",
                          value: config?.totalEndpoints,
                          icon: SpinnerIcon,
                          color: "orange",
                        },
                      ]}
                    />
                    <DashboardMetadataCards
                      items={[
                        {
                          title: "Expected Metadata",
                          items: [
                            {
                              name: "Environment",
                              value: config?.metadata?.expected?.env,
                            },
                            {
                              name: "URL",
                              value: config?.metadata?.expected?.url,
                            },
                          ],
                        },
                        {
                          title: "Actual Metadata",
                          items: [
                            {
                              name: "Environment",
                              value: config?.metadata?.actual?.env,
                            },
                            {
                              name: "URL",
                              value: config?.metadata?.actual?.url,
                            },
                          ],
                        },
                      ]}
                    />
                    <HStack mt={5} justify={"center"}>
                      <DiffLayout diffResults={config?.tests} />
                    </HStack>
                  </Stack>
                ),
              },
              {
                title: "Expected HTML Cucumber Report",
                panel: (
                  <Iframe
                    url={`/${reportId}/expected_cucumber_report.html`}
                    width="100%"
                    height="800px"
                    id="myId"
                    className="myClassname"
                    display="block"
                    position="relative"
                  />
                ),
              },
              {
                title: "Actual HTML Cucumber Report",
                panel: (
                  <Iframe
                    url={`/${reportId}/actual_cucumber_report.html`}
                    width="100%"
                    height="800px"
                    id="myId"
                    className="myClassname"
                    display="block"
                    position="relative"
                  />
                ),
              },
            ]}
          />
        </Stack>
      )}
    </>
  );
};

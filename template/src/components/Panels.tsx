import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
type Tab = {
  title: string;
  panel: React.ReactNode;
};
interface IPanelsProps {
  tabs: Tab[];
}
export const Panels = ({ tabs }: IPanelsProps) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList justifyContent={"center"}>
        {tabs.map((tab) => (
          <Tab>{tab.title}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel>{tab.panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

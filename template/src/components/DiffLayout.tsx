import { DiffList } from "./DiffList";
import { IDiffs } from "../types";

interface IDiffLayoutProps {
  diffResults: any;
}

export const DiffLayout = ({ diffResults }: IDiffLayoutProps) => {
  return <DiffList diffResults={diffResults} />;
};

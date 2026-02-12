import { PropsWithChildren } from "react";
import { ReduxProvider } from "./ReduxProvider";

export const AppProvider = (props: PropsWithChildren) => {
  return <ReduxProvider>{props.children}</ReduxProvider>;
};

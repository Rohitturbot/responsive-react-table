import { addDecorator } from "@storybook/react";
import { Container } from "react-bootstrap";
import { BootstrapBreakpointProvider } from "../src/hooks/useBootstrapBreakpoint";
import "../src/index.scss";

addDecorator((storyFn) => (
  <BootstrapBreakpointProvider>
    <Container fluid>{storyFn()}</Container>
  </BootstrapBreakpointProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

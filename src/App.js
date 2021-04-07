import TableExample1 from "./component/TableExample1";
import TableExample2 from "./component/TableExample2";
import usePageTitle from "./hooks/usePageTitle";
import { BootstrapBreakpointProvider } from "./hooks/useBootstrapBreakpoint";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

const App = () => {
  usePageTitle("Juv Table");
  return (
    <BootstrapBreakpointProvider>
      <Container fluid>
        <Row className="mt-4">
          <Col>
            <Tabs id="juvTable">
              <Tab eventKey="example1" title="Holdings">
                <TableExample1 />
              </Tab>
              <Tab eventKey="example2" title="Truncations">
                <TableExample2 />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </BootstrapBreakpointProvider>
  );
};

export default App;

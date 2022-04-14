import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/** Summary pageとEntry pageはプロバイダが必要 */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/** Confirmation pageはプロバイダが不要 */}
    </Container>
  );
}

export default App;

import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// 全てを再export
export * from "@testing-library/react";

// renderメソッドをオーバーライド
export { renderWithContext as render };

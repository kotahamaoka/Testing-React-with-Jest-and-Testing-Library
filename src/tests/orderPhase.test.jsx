import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("オーダーの段階のハッピーパス", async () => {
  // Appをレンダリング
  render(<App />);
  //アイスのscoopsとtoppingsを追加
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  // 注文ボタンを見つけ、クリック
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  // 注文の情報を確認（ここ、画面変わるけど前の画面の情報は残っちゃわない？）

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();
  //Scoopsの合計が$2.00になっている
  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  //Toppingsの合計が$1.50になっている
  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  //注文した商品が表示されている
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // 規約に同意して、ボタンを押して注文を確定
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  userEvent.click(confirmOrderButton);

  //注文確定ページへ
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = screen.getByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // 確認ページで"Create new order"ボタンをクリック
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // scoopsとtoppingsの小計がリセットされたことを確認
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
  const toppingsSubtotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsSubtotal).toBeInTheDocument();

  // ページの状態が、テストが存在する前の状態に戻ったことを確認
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

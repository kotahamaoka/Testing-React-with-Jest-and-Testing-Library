import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("scoopsが変わった際に、scoopの小計を更新する", async () => {
  render(<Options optionType="scoops" />);

  // 小計が$0.00から始まることを確認
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // バニラのscoopを1にした際に、小計を確認
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // チョコレートのscoopを2にした際に、小計を確認
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");

  // チョコレートのscoopを1に減らした際に、小計を確認
  userEvent.type(chocolateInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("4.00");
});
test("toppingsが変わった時に、toppingの小計を更新する", async () => {
  render(<Options optionType="toppings" />);

  // 小計が$0.00から始まることを確認
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // Cherriesにチェックを入れた時に、小計を確認
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(cherriesCheckbox);
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // Hot Fudgeにチェックを入れた際に、小計を確認
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  userEvent.clear(hotFudgeCheckbox);
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // Hot Fudgeからチェックを外した際に、小計を確認
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("全体の合計", () => {
  test("scoopsを先に追加した際に、全体の合計が正常に更新される", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // 全体の合計ははじめ$0.00
    expect(grandTotal).toHaveTextContent("0.00");

    // vanillaのscoopを1に変更
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // Cherriesのtoppingを追加
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(cherriesCheckbox);
    userEvent.click(cherriesCheckbox);

    // 全体の合計が$3.50になることを確認

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("toppingsを先に追加した際に、全体の合計が正常に更新される", async () => {
    render(<OrderEntry />);

    // Cherriesのtoppingを追加
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(cherriesCheckbox);
    userEvent.click(cherriesCheckbox);

    // vanillaのscoopを1に変更
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // 全体の合計が$3.50になることを確認
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("商品が取り除かれた際に、全体の合計が正しく更新される", async () => {
    render(<OrderEntry />);

    // Cherriesのtoppingを追加
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(cherriesCheckbox);
    userEvent.click(cherriesCheckbox);

    // vanillaのscoopを1に変更
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // 全体の合計が$3.50になることを確認
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("3.50");

    // Cherriesのtoppingを0に変更
    userEvent.click(cherriesCheckbox);

    // 全体の合計が$2.00になることを確認
    expect(grandTotal).toHaveTextContent("2.00");

    // vanillaのscoopを0に変更
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");

    // 全体の合計が$0.00になることを確認
    expect(grandTotal).toHaveTextContent("0.00");
  });
});

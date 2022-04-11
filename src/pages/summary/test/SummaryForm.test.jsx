import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("初期表示", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  //初期状態ではチェックが入っていないことを確認
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});
test("チェックボックスにチェックを入れるとボタンが活性になり、チェックを外すと非活性になる", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  //チェックボックスにチェックを入れる
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  //チェックボックスからチェックを外す
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
test("マウスオーバーした際にポップオーバーが表示される", async () => {
  render(<SummaryForm />);
  // ポップオーバーは初期状態では非表示
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // チェックボックスのラベルの上に、チェックボックスのラベルの上に表示される
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/terms and conditions/i);
  expect(popover).toBeInTheDocument();

  // マウスオーバーをやめるとポップオーバーが非表示になる
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});

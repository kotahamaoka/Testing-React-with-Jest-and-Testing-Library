import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
import ToppingOption from "../ToppingOption";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("各スクープのオプションに対し画像を表示", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // 画像を見つける
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // 画像のalt属性のテキストを見つける
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
test("各トッピングのオプションに対し画像を表示", async () => {
  render(<Options optionType="toppings" />);

  // 画像を見つける
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // 画像のalt属性のテキストを見つける
  const imageTitles = toppingImages.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

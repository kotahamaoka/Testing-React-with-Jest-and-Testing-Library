import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("各スクープのオプションに対し画像を表示", async () => {
  render(<Options optionType="scoops" />);

  //   画像を見つける
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //   画像のalt属性のテキストを見つける
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

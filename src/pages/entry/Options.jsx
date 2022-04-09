import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    //   optionTypeは"scoops"もしくは"toppings"
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //   TODO: エラーハンドリング
      });
  }, [optionType]);

  const ItemComoponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComoponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}

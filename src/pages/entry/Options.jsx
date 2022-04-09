import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
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

  //   TODO: nullをToppingOptionで置き換える
  const ItemComoponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComoponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}

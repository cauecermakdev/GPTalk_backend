import { supermemo, SuperMemoItem } from "supermemo";

let item: SuperMemoItem = {
  interval: 0,
  repetition: 0,
  efactor: 2.5,
};

console.log(item);

item = supermemo(item, 5);
console.log(item);

item = supermemo(item, 1);
console.log(item);

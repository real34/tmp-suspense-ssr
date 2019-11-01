import React, { useState } from "react";

const meat = { name: "Meat" };
const pasta = { name: "Pasta" };
const pie = { name: "Pie" };
const salad = { name: "Salad" };

const customers = [
  {
    name: "Pierre",
    dishes: {
      starter: null,
      main: pasta,
      dessert: pie
    }
  },
  {
    name: "Paul",
    dishes: {
      starter: salad,
      main: pasta,
      dessert: pie
    }
  },
  {
    name: "Jacques",
    dishes: {
      starter: null,
      main: meat,
      dessert: null
    }
  }
];

const Waiting = () => <p>Waiting for waiter or waitress</p>;
const Dish = ({ dish }) => <p>{dish.name}</p>;

const Customer = ({ name, currentDish, dishes }) => {
  const dish = dishes[currentDish];

  return (
    <article>
      <h2>{name}</h2>
      {dish ? <Dish dish={dish} /> : <Waiting />}
    </article>
  );
};

const dishes = ["ordering", "starter", "main", "dessert"];

const Restaurant = () => {
  const [currentDish, setCurrentDish] = useState(dishes[0]);
  const nextDish = dishes[dishes.indexOf(currentDish) + 1];

  const handleNextDish = () => setCurrentDish(dish => nextDish);

  return (
    <section>
      <h1>Restaurant (WIP)</h1>
      <p>Current dish: {currentDish}</p>

      {nextDish && <button onClick={handleNextDish}>Next dish</button>}

      {customers.map((customer, index) => (
        <Customer key={index} {...customer} currentDish={currentDish} />
      ))}
    </section>
  );
};

export default Restaurant;

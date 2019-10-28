import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

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

const App = () => {
  const [currentDish, setCurrentDish] = useState(dishes[0]);
  const nextDish = dishes[dishes.indexOf(currentDish) + 1];

  const handleNextDish = () => setCurrentDish(dish => nextDish);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <h1>{currentDish}</h1>

      {nextDish && <button onClick={handleNextDish}>Next dish</button>}

      {customers.map((customer, index) => (
        <Customer key={index} {...customer} currentDish={currentDish} />
      ))}
    </div>
  );
};

export default App;

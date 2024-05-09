
export function showTypeDescription(type, index)  {
  try {
    switch (type){
      case "Breakfast":
        return Breakfast[index].name;
      case "Lunch":
        return Menu[index].name;
      case "Dinner":
        return Menu[index].name;
    }
  }catch (err) {
    return err.message;
  }   
};
export function showDishes(type, index)  {
  try {
    let obj = '';
    let lista = [];
    switch (type){
      case "Breakfast":
        obj = Breakfast[index];
        break;
      case "Lunch":
      case "Dinner":
        obj = Menu[index];
        break;
    }
    
    for (var k in obj.items) {
      let price = '';
      switch (type){
        case "Dinner":
          price = `${obj.price[k] * 1.25}€ `;
        break;
        default:
          price = `${obj.price[k]}€ `;
        
      }
      let name = obj.name;
      name = name.toLowerCase();
      var aux = {
        type: name,
        dish: obj.items[k], 
        price: price
      };
      lista.push(aux);
    }
    // alert(lista);
    return lista;
  }catch (err) {
    return err.message;
  }    
};
const Breakfast = [
  {
    "name": "INGREDIENTS",
    "items": [
      "Eggs",
      "Bacon ",
      "Toasts",
      "Beans",
      "Sausages",
      "Fries",
      "Bowl of fruits"
    ],
    "price": [5, 4, 4, 5, 5, 5, 6]
  },
  {
    "name": "BEVERAGES",
    "items": [
      "Coffee",
      "Latte",
      "Capuccino",
      "Orange juice"
    ],
    "price": [2, 2, 2, 2]
  }
];
const Menu = [
    {
      "name": "MAIN",
      "items": [
        "Chicken Masala",
        "Lamb Masala",
        "Chicken Handi",
        "Lamb Handi",
        "Chicken Kadai",
        "Chicken Kolhapuri",
        "Chicken Hyderabadi",
        "Beef Tikka Masala",
        "Chicken Roast Masala",
        "Lamb Roast Masala",
        "Beef Afghani",
        "Chicken Rara*",
        "Chicken Seekh Kebab Masala",
        "Murgh Musallam",
        "Chicken Mughlai",
        "Beef Patiala",
        "Butter Chicken",
        "Butter Beef",
        "Chicken Aftabi",
        "Lamb Bhuna",
        "Chicken Methi Masala",
        "Egg Masala"
      ],
      "price": [
        22,
        28,
        24,
        23,
        25,
        26,
        27,
        20,
        26,
        23,
        25,
        25,
        20,
        26,
        23,
        28,
        22,
        18,
        16,
        16,
        23,
        15
      ]
    },
    {
      "name": "SIDERS",
      "items": [
        "Garlic Bread",
        "Nachos bowl",
        "Salad bowl",
        "Vegetables bowl",
        "Rice bowl",
        "Noodles bowl",
        "Fries bowl"
      ],
      "price": [5, 5, 5, 6, 3, 3, 4]
    }
  ];
const Desserts = [
    {
      "name": "UNIQUE DESSERT",
      "items": [
        "Sizzling Brownie",
        "Deep Fried Ice Cream(2pcs)",
        "Deep Fried Ice Cream(3pcs)",
        "Chocolate Cigar(3pcs)",
        "Chocolate Explosion Waffle(H)",
        "Chocolate Explosion Waffle(F)",
        "Ice Cream(1scp)",
        "Ice Cream(2scp)"
      ],
      "price": [145, 90, 120, 130, 180, 300, 50, 80]
    }
  ];
const Pasta = [
    {
      "name": "ITALIAN PASTA(VEG)",
      "items": [
        "Pasta Classica",
        "Pasta Hot n Spicy",
        "Pasta Arabiata",
        "Pesto Pasta",
        "Pasta Alfredo",
        "Pasta De Pina",
        "Pasta Baked mac",
        "Monsoon Pink Pasta"
      ],
      "price": [125, 160, 160, 170, 180, 180, 190, 200]
    },
    {
      "name": "ITALIAN PASTA(NON VEG)",
      "items": [
        "Pasta Classica",
        "Pasta Hot n Spicy",
        "Pasta Arabiata",
        "Pesto Pasta",
        "Pasta Alfredo",
        "Pasta De Pina",
        "Pasta Baked mac",
        "Monsoon Pink Pasta"
      ],
      "price": [145, 180, 180, 190, 200, 200, 210, 220]
    },
    {
      "name": "ITALIAN PIZZS(VEG)",
      "items": [
        "Pizza Margarita",
        "Pizza BBQ",
        "Pasta Mexicana",
        "Pasta Volcano",
        "Pasta Farm Fresh",
        "Pasta Lavena",
        "Pasta Noodles"
      ],
      "price": [120, 150, 150, 170, 180, 190, 210]
    },
    {
      "name": "ITALIAN PIZZS(NON VEG)",
      "items": [
        "Pizza Margarita",
        "Pizza BBQ",
        "Pasta Mexicana",
        "Pasta Volcano",
        "Pasta Farm Fresh",
        "Pasta Lavena",
        "Pasta Noodles"
      ],
      "price": [140, 170, 170, 190, 200, 210, 230]
    }
  ];
const Drinks = [
    {
      "name": "MOJITO",
      "items": [
        "Virgin Mint",
        "Blood Orange",
        "Blue Valley",
        "Grandine",
        "Orange",
        "Green Apple",
        "Water Melon"
      ],
      "price": [95, 95, 95, 95, 95, 95, 95]
    }
  ];

  
// import moment from '/moment';
// variables
const MainOptions = [
  {
    "name": "BREAKFAST",
    "div_id": "div-zero-a",
    "type": "breakfast-all",
    "offer": "Choose any 3 main ingredients and 1 beverage ",
    "bold": "FOR 9,99€*",
    "watch": "* Any added ingredient will be charged."
  }, 
  {
    "name": "LUNCH",
    "div_id": "div-one-a",
    "type": "lunch-main",
    "offer": "Choose 1 main Course and 2 sides only",
    "bold": "FOR 19,99€*",
    "watch": "* Any added side will be charged. Beverages not included."
  },
  {
    "name": "DINNER",
    "div_id": "div-two-a",
    "type": "dinner-main",
    "offer": "Choose 1 main Course and 2 sides only",
    "bold": "FOR 24,99€*",
    "watch": "* Any added side will be charged. Beverages not included."
  },
];

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

var myOrder = {
  breakfast_offer: 9.99,
  lunch_offer: 19.99,
  dinner_offer: 24.99,    
  main_type:'',
  prices_values: [],
  dishes_values: [], 
  main_counter: 0,
  sub_counter: 0,
  total_counter: 0,
  total_price: 0,
  offer_price: '',
  offer_price_applied: 0,
  number_offers: 0,
  price_out_of_offer: 0,
  total_price_considering_offers: 0,
  saved_amount: 0,
  random_messages_emo: ['That is really a good deal!!', ' Your choice suits perfectly!!', 'This is a great choice!!'],
  random_messages_rac: ['All our ingredients are natural!!', ' All our dishes are homemade!!', 'I am sure you will enjoy the meal!!'],
  
  setMainProperties: function (type) {
      this.main_type = type === "0" ? "Breakfast"  : type === "1" ? "Lunch" : "Dinner"  ;
      this.offer_price = this.main_type === "Breakfast" ? this.breakfast_offer : this.main_type === "Lunch" ? this.lunch_offer: this.dinner_offer ;
  },
  saveDishes: function (object, index_2, plus = {"dish": '', "price" : 0}){
      let basic_price = this.main_type === 'Dinner' ? parseFloat(object.price[index_2] * 1.25): object.price[index_2] ;
      let price = plus.price <= 0 ? basic_price : parseFloat(basic_price) + parseFloat(plus.price); 
      let name =  plus.price <= 0 ? object.items[index_2] :`${object.items[index_2].concat(' ', plus.dish)} (base €: ${basic_price}€.) ` ; 
      let new_dish = {
          "type": object.name.toLowerCase(),
          "name": name,
          "price": price
      };        
      this.dishes_values.push(new_dish);
      this.computeCounters();
      return this.returnMessages();
  },
  deleteDishes: function (index){
      this.dishes_values.splice(index,1);
      this.computeCounters();
      return this.returnMessages();
  },
  returnDishes: function () {
      let contenido = '';
      for (var i=0; i< this.dishes_values.length;i++) {
          contenido =`${contenido}nº ${i} - ${this.dishes_values[i].name}: ${this.dishes_values[i].price}€.; \n`;
      };
      return contenido;
  },
  computeCounters: function () {

      let main = this.main_type === "Breakfast" ? "ingredients" : "main" ;
      let sub = this.main_type === "Breakfast" ? "beverages" : "siders" ;

      let result_main = this.dishes_values.filter((dish) => dish.type ===main);
      let result_sub= this.dishes_values.filter((dish) => dish.type ===sub);
      this.main_counter = result_main.length;
      this.sub_counter = result_sub.length;
      this.total_counter = this.dishes_values.length;
      let lista = [];
      for (var i=0; i< this.dishes_values.length;i++) {
          lista.push(parseFloat(this.dishes_values[i].price)); 
      };
      this.prices_values = lista;
      this.total_price = 0;
      if (this.total_counter > 0) {
          let reducer = (accumulator, curr) => accumulator + parseFloat(curr);
          this.total_price = parseFloat(this.prices_values.reduce(reducer));             
      }
  },
  returnMessages: function (){
      let main = this.main_type === "Breakfast" ? "ingredients" : "main" ;
      let sub = this.main_type === "Breakfast" ? "beverages" : "siders" ;
      let value_root = this.main_type === "Breakfast" ? 3  : 2 ;
      let ratio = 0;
      let message = '';
      let n_main_elems_out_of_offer = 0;
      let n_sub_elems_out_of_offer  = 0;
      switch(this.main_type){
          case "Breakfast":

              if (this.sub_counter > 0 && this.main_counter > (value_root - 1))
                  {
                      ratio = parseFloat(this.main_counter / this.sub_counter);
                  }
                  if (ratio === 0) {
              
                  //Es imposible que haya una oferta
                  this.number_offers = 0;

                  let value = Math.round(Math.round(Math.random() * (this.random_messages_rac.length -1)));
                  message = this.random_messages_rac[value];

              }else if (ratio === value_root) {
                  //Justo se produce la oferta
                  this.number_offers = this.sub_counter;
                  n_main_elems_out_of_offer = 0;
                  n_sub_elems_out_of_offer = 0;

                  message = "You have an offer applied. Really good choice the one you have made!!";

              }else if (ratio > value_root) {
                  //Justo se produce la oferta pero hay mas dishes que facturar aparte (main)
                  this.number_offers = this.sub_counter;
                  n_main_elems_out_of_offer = this.main_counter -(this.sub_counter * value_root) ;
                  n_sub_elems_out_of_offer = 0;

                  let value = Math.round(Math.round(Math.random()*  (this.random_messages_emo.length -1)));
                  message = this.random_messages_emo[value];

              }else if (ratio < 1) {
                  //Justo se produce la oferta pero ha mas dishes que facturar aparte (mAIN Y SUB)
                  // Hay más subs que mains
                  this.number_offers = Math.floor(this.main_counter / value_root);
                  n_main_elems_out_of_offer = this.main_counter  % value_root ;
                  n_sub_elems_out_of_offer = this.sub_counter- Math.floor(this.main_counter / value_root);

                  let value = Math.round(Math.round(Math.random()*  (this.random_messages_rac.length -1)));
                  message = this.random_messages_rac[value];

              }else if (ratio >= 1 && ratio < value_root) {
                  //Justo se produce la oferta pero ha mas dishes que facturar aparte (mAIN Y SUB)
                  this.number_offers = Math.floor(this.main_counter / value_root);
                  n_main_elems_out_of_offer = this.main_counter  % value_root ;
                  n_sub_elems_out_of_offer = this.sub_counter- Math.floor(this.main_counter / value_root);

                  message = 'Maybe you should choose more ingredients and we will apply another offer';
              };
              break;
      case "Lunch":
      case "Dinner":
          if (this.main_counter > 0 && this.sub_counter > (value_root - 1))
              {
                  ratio = parseFloat(this.sub_counter / this.main_counter);
              }
           
          if (ratio === 0) {
              //Es imposible que haya una oferta
              this.number_offers = 0;

              let value = Math.round(Math.round(Math.random()*  (this.random_messages_rac.length -1)));
              message = this.random_messages_rac[value];

          }else if (ratio === value_root) {
              //Justo se produce la oferta
              this.number_offers = this.main_counter;
              n_main_elems_out_of_offer = 0;
              n_sub_elems_out_of_offer = 0;

              message = "You have an offer applied. Really good choice the one you have made!!";

          }else if (ratio > value_root) {
              //Justo se produce la oferta pero hay mas dishes que facturar aparte (sub)
              this.number_offers = Math.floor(this.sub_counter / value_root);
              n_main_elems_out_of_offer = 0;
              n_sub_elems_out_of_offer = this.sub_counter -(this.main_counter * value_root) ;

              message = `Maybe you should ask for another main course`;
              let siders_left = value_root - n_sub_elems_out_of_offer;

              if (siders_left > 0) {
                  message = `Maybe you should ask for another main course and ${siders_left} siders to join a new offers.`;
              };
              
          }else if (ratio < 1) {
              //Justo se produce la oferta pero hay mas dishes que facturar aparte (main y/o sub)
              this.number_offers = Math.floor(this.sub_counter / value_root);
              n_main_elems_out_of_offer = this.main_counter- Math.floor(this.sub_counter/ value_root) ;
              n_sub_elems_out_of_offer = this.sub_counter % value_root;

              let value = Math.round(Math.round(Math.random()*  (this.random_messages_rac.length -1)));
              message = this.random_messages_rac[value];

          }else if (ratio >= 1 && ratio < value_root) {
               this.number_offers = Math.floor(this.sub_counter / value_root);
              n_main_elems_out_of_offer = this.main_counter- Math.floor(this.sub_counter/ value_root) ;
              n_sub_elems_out_of_offer = this.sub_counter % value_root;

              message = 'Maybe you should choose more siders and we will apply another offer.';
          };
          break;                
      };      
      if (ratio === 0) {
          this.price_out_of_offer = this.total_price;
      } else {
          let result_main= this.dishes_values.filter((dish) => dish.type === main );
          let price_01 = this.computePriceOutOfOffer(result_main, n_main_elems_out_of_offer);
          
          let result_sub= this.dishes_values.filter((dish) => dish.type === sub );
          let price_02 =  this.computePriceOutOfOffer(result_sub, n_sub_elems_out_of_offer);

          this.price_out_of_offer = parseFloat(price_01) + parseFloat(price_02);    
      };
      this.offer_price_applied = Math.round(parseFloat(this.number_offers * this.offer_price)*100)/100;
      this.total_price_considering_offers = Math.round(parseFloat(this.offer_price_applied + this.price_out_of_offer)*100)/100;
      this.saved_amount = Math.round(parseFloat(this.total_price - this.total_price_considering_offers)*100)/100;
      return message;
  },
  computePriceOutOfOffer: function(my_array, numero_elementos_out_of) {
      let suma = 0;
      if (numero_elementos_out_of > 0) {
          let resultados = my_array.slice();
          let mapArray = resultados.map((registro) => registro.price);
          mapArray.sort();
          mapArray.reverse();
          let res_end = mapArray.slice(0, numero_elementos_out_of);
          // alert([res_end]);
          // suma = this.computeSum(res_end);
          // WATCH OUT!! The code above does not work and I do not know why
          for (var i=0; i < res_end.length; i++){
              suma = suma + parseFloat(res_end[i]);
          }
      }

      return suma;
  },
  computeSum: function (my_arr){
      let reducer = (accumulator, curr) => accumulator + curr;
      return parseFloat(my_arr.reduce(reducer)); 
  },
  messageChosenDishes: function(object_menu ,choosen_main) {
    let message_main_meal = `${this.total_counter} dishes.;`;
    message_main_meal = `${message_main_meal} \n ${this.returnDishes()}.;  `;
    message_main_meal = `${message_main_meal} \n \n Total € (with no offers): ${this.total_price}€.;`;
    message_main_meal = `${message_main_meal} \n Applied Offer: ${this.offer_price_applied}€.; `; 
    message_main_meal = `${message_main_meal} \n Out of Offer: ${this.price_out_of_offer}€.;`; 
    message_main_meal = `${message_main_meal} \n Final Price: ${this.total_price_considering_offers}€.;`; 
    message_main_meal = `${message_main_meal} \n Saved Amount: ${this.saved_amount}€.;`; 
    return message_main_meal
  }
};

class MainOptionMessage {
constructor(main_options) {
  this.main_options = main_options;
}
today () {
  let ahora = Date.now();
  let today = new Date(ahora);
  return today.toDateString();
}
todayHour () {
  let ahora = Date.now();
  let today = new Date(ahora);
  return today.getHours();
}
getAllMainOptions(item) {
  return [item.name,item.offer,item.bold].join(" ");   
 }
timeMessage(hour) {
  try {
    if (hour > 8 && hour <12 )
    {
      return 'I am sure you are willing for a good Breakfast';
    }else if (hour >= 12 && hour <16 ){
      return 'I am sure you are willing for a good Lunch';
    }else if (hour >= 16 && hour <18 ){
      return 'I am sure you are willing for a good Dinner, but you will have to wait till 18h, when we open.';
    }else if (hour >= 18 && hour <22 ){
      return 'I am sure you are willing for a good Dinner';
    }else if (hour >= 6 && hour <8 ){
      return 'I am sure you are willing for a good Breakfast, but you will have to wait till 8h, when we open.';
    }else{
      return 'I am afraid we are now closed.';
    }
  }catch (err) {
    return err.message;
  }  
}
showMessage(printArray) {
  let array = this.main_options.map(this.getAllMainOptions);
  let welcome_message = 'Welcome to The Tfree \n ';
  welcome_message = `${welcome_message}. Today is ${this.today()}.  \n`;
  welcome_message = `${welcome_message}. Considering that the time is ${this.todayHour()} you might like a ${this.timeMessage(this.todayHour())}. \n`;
  welcome_message = `${welcome_message}. But you might like to choose another option \n ${printArray(array)}.  \n`;
  return welcome_message;
}
};
class MealsMessage {
constructor(obj_menu, type) {
  this.obj_menu = obj_menu;
  this.type = type;
  this.obj_menu_total = 0;
  this.cookingOptions = [
    {
        "dish": "Roasted",
        "price": "2",
    },
     {
        "dish": "With Sauces",
        "price": "2",
    },
    {
        "dish": "In Olive Oil",
        "price": "3",
    }
  ];
};
showDishes()  {
  try {
    let obj = this.obj_menu;
    let lista = [];
    for (var k in obj.items) {
      let price = this.type === "Dinner" ?  `${obj.price[k] * 1.25}€ `: `${obj.price[k]}€ `;
      let name = obj.name;
      name = name.toLowerCase();
      var aux = {
        type: name,
        dish: obj.items[k], 
        price: price
      };
      lista.push(aux);
    }
    this.obj_menu_total = lista.length;
    return lista;
    
  }catch (err) {
    throw err.message;
  }    
}
getAllDishes(item) {
  return [item.dish,item.price].join(" ");
} 
getAllOptins(item) {
  return [item.dish,`${item.price}€.`].join(":");
} 
showMessage(printArray) {
  let array = this.showDishes().map(this.getAllDishes);
  let message = printArray(array);
  message = `${this.obj_menu.name} \n ${message}`;
  return message;
}
showOptionsMessage(printArray) {
  let message = '';
  switch (this.type){
    case "Breakfast":
      break;
    default:
      let array = this.cookingOptions.map(this.getAllOptins);
      message = printArray(array);
      message = `Would you like any of those cooking choices? \n ${message}`;
  };

  return message;
}
};
// FUNCTIONS
function printArray(my_arr) {
let result = '';
for (var els in my_arr) {
  result = `${result} ${els} - ${my_arr[els]} \n`;
}
return result;
};
function showBill(content) {
var win = window.open('','UATRpt', 'menubar=0,location=0,toolbar=0,resizable=1,status=1,scrollbars=1');
const str_style = `
  html {
   font-size: 92.5%; 
   }
  body {
     overflow-x: hidden;
     font-weight: normal;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-rendering: optimizeLegibility;
     -webkit-tap-highlight-color: transparent;
     font-family: Arial;
 }
 .container {
     margin-top: 0.5rem;
     display: grid;
     grid-template-columns: 1fr;
     justify-items: center;
 }
 .header > h1 {
     color: rgb(74, 224, 119);
     text-decoration: underline;
 }
 .logo {
    background-image: url("https://as1.ftcdn.net/v2/jpg/00/89/55/10/1000_F_89551095_siRgqKW7BktfYprVIBayNfR71k3JJwW1.jpg");
    height: 200px;
    width: 300px;
    background-position: center;
    background-repeat: no-repeat;
  }
 .orders-wrapper {
     padding: 20px;
     border-right: 1px solid rgb(74, 224, 119); 
     border-radius: 150px;
     margin-top: 20px;
     margin-left: 30px;
 }
 .orders-wrapper > h2, h3 {
     font-weight: 500;
     color: rgb(249, 86, 126);
 }
 .orders-wrapper > div {
     color: rgb(199, 86, 126); 
 }
 .orders-wrapper > div:nth-child(9) {
     color: rgb(249, 86, 126); 
     font-weight: 300;
 }`;

const main_div_start = `<div class='container'>
    <div class='header'>
      <h1>Welcome to The Tree</h1>
    </div>
    <div class='logo'></div>
    <div class='orders-wrapper'>
      <h2>Thank you very much for your order. </h2>
    `;

const main_div_end = `</div>
        </div>`;
if(win.document) { 
  win.document.write(`<html><head><title>Your Order</title></head><style>${str_style}</style><body>${main_div_start}<div>${content}</div>${main_div_end}</body></html> `);
} 
return true;
} ;
// PROMISES FUNTIONS
const numberDishes = (total_dishes) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (total_dishes > 0){
          resolve('Now you can order');
      }else {
          reject('CHOOSE YOUR OPTIONS');
      }
    }, 1000); 
  });
}
function exitoCallback() {
alert(`Thank you very much for your order. \n \n We will proceed to charge you the following dishes: \n ${myorder.messageChosenDishes()} `);
let choosen = myorder.messageChosenDishes();
choosen = choosen.replaceAll(';','</div><div>');
const contenido = `${choosen} <br><br> Hope you have enjoyed your <strong>${myorder.main_type.toUpperCase()}</strong> and HOPE ALSO to see you soon. `;
let isTrue= showBill(contenido);
};
function falloCallback() {
alert("The have been some mistake with the order. Maybe we shoul start again.");
};


// BEHAVE
// Welcome and main options shows (Breakfast ,lunch and dinder)
var main_option_message = new MainOptionMessage(MainOptions);
let welcome_message = main_option_message.showMessage(printArray) ;

let choosen_meal = prompt(welcome_message);
if (choosen_meal < 0 || choosen_meal > 2 || choosen_meal === '' || choosen_meal === null) {
do {
   choosen_meal = prompt(welcome_message);
} while (choosen_meal < 0 || choosen_meal >2 || choosen_meal === '' || choosen_meal === null);   
};

// We create a new order
var myorder = myOrder;
myorder.setMainProperties(choosen_meal);
let objChoosenMeal = myorder.main_type === "Breakfast" ? Breakfast : Menu;
// Options and menus
var main_menu_message = new MealsMessage(objChoosenMeal[0], myorder.main_type);
let message_offered_dishes_main = main_menu_message.showMessage(printArray) ;
var sub_menu_message = new MealsMessage(objChoosenMeal[1], myorder.main_type);
let message_offered_dishes_sub = sub_menu_message.showMessage(printArray) ;
// Welcome message
let welcome = myorder.main_type === "Breakfast" ? " Please, Make me know when you Choose the ingredients you want" : "Please Make me know when you decide What is the main course you would like to order?" ;
let output_message = `Welcome to the Tree!! \n \n Have a seat and have a look to our ${myorder.main_type} menu.\n \n ${welcome} \n`;
output_message = `${output_message} ${message_offered_dishes_main} \n`;
output_message = `${output_message} ${message_offered_dishes_sub} \n`;
alert(output_message);

//Show and select and delete dishes
var respuesta_fin = false;
do {
//Show and select main dishes
  var respuesta = true;
  do {
    let choosen_main = prompt(message_offered_dishes_main);
    // alert(choosen_main);
    let maximo = main_menu_message.obj_menu_total ;
    if (choosen_main < 0 || choosen_main > maximo || choosen_main === '') {
      do {
         choosen_main = prompt(message_offered_dishes_main);
      } while (choosen_main < 0 || choosen_main > maximo  || choosen_main === '');   
    };
    
    if (choosen_main !== null) {
      let plus = {"dish": '', "price" : 0};
      if (myorder.main_type !== "Breakfast") {
        let optionquestion = main_menu_message.showOptionsMessage(printArray);
        respuesta = prompt(`${optionquestion} \n \n It has an added cost but it is worthy!! `); 
        plus = respuesta === null || respuesta >= main_menu_message.cookingOptions.length ? plus: main_menu_message.cookingOptions[respuesta];          
      }
      let message_main_meal = myorder.saveDishes(objChoosenMeal[0],choosen_main, plus);
      message_main_meal = `${message_main_meal} \n \n ${myorder.messageChosenDishes()} `;
      
      respuesta = confirm(`${message_main_meal} \n \n What ${objChoosenMeal[0].name} would you like to ORDER? `);       
    }else{
      respuesta = false;
    };
} while (respuesta === true);   


//Show and select subs dishes
do {
  let choosen_sub = prompt(message_offered_dishes_sub);
  let maximo = sub_menu_message.obj_menu_total ;
  if (choosen_sub < 0 || choosen_sub > maximo  || choosen_sub === '') {
    do {
       choosen_sub = prompt(message_offered_dishes_sub);
    } while (choosen_sub < 0 || choosen_sub > maximo  || choosen_sub === '');   
  };
  if (choosen_sub !== null) {
    let message_sub_meal = myorder.saveDishes(objChoosenMeal[1],choosen_sub);
    message_sub_meal = `${message_sub_meal} \n \n  ${myorder.messageChosenDishes()} `;

    respuesta = confirm(`${message_sub_meal} \n \n What ${objChoosenMeal[1].name} would you like to ORDER? `); 
  }else{
      respuesta = false;
  };
} while (respuesta === true);   

// Something to erase
respuesta = confirm(`Is it something you would like to DELETE? \n ${myorder.messageChosenDishes()} \n `);  
if (respuesta === true) {
    do {
      let choosen_dishes_to_delete = prompt(`What are the dishes you would like to DELETE? \n ${myorder.messageChosenDishes()} \n `); 
      if (choosen_dishes_to_delete !== null) {
        let message_dishes_deleted = myorder.deleteDishes(choosen_dishes_to_delete);
        message_dishes_deleted = `${message_dishes_deleted} \n \n  ${myorder.messageChosenDishes()} `;
        respuesta = confirm(`${message_dishes_deleted} \n \n Is it something that you would like to DELETE? `);
      }else{
        respuesta = false;
      };
  } while (respuesta === true);   
};  
respuesta_fin = confirm(`Would you like to ask for anything else or shall we order now? \n \n `);  
} while (respuesta_fin === true);  

// The end of the order, asking the bill
let promesa2 = numberDishes(myorder.total_counter).then(exitoCallback, falloCallback);

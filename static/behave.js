document.onreadystatechange = function() {
    var myorder = myOrder;
    document.onclick = event => {

        if (event.target.matches('.btn-main-option')) {
            
            let selected = event.target;
            let padre = selected.parentNode;
            let ori_string = padre.innerHTML;
            let message = myorder.saveDishes(ori_string);
            printScreenOrder(myorder);
            let el = document.getElementById('comment-dishes');
            el.innerHTML = message;
            activateOrder(numberDishes(myorder), activateSubmit(myorder));
        };

        if (event.target.matches('.btn-delete-option')) {
            let selected = event.target;
            let padre = selected.parentNode;
            let ori_string = padre.innerHTML;
            let str_01 = ori_string.split('<div class="hidden">');
            let str_02 = str_01[1].split(")");
            let str_03 = str_02[0].replace("(","").trim();
            let message = myorder.deleteDishes(str_03);
            printScreenOrder(myorder);
            let el = document.getElementById('comment-dishes');
            el.innerHTML = message;
            activateOrder(numberDishes(myorder), activateSubmit(myorder));
        };

        if (event.target.matches('#btn-exit')) {
            document.getElementById('abs-offers').style.visibility = 'hidden';
        };
        if (event.target.matches('#div-zero-a')) {
            myorder.setMainProperties("Breakfast");
            behaveTime("Breakfast");
            el = document.getElementById('div-zero');
            el.style.display = 'block';
        };
        if (event.target.matches('#div-one-a')) {
            myorder.setMainProperties("Lunch");
            behaveTime("Lunch");
            el = document.getElementById('div-one');
            el.style.display = 'block';
        };
        if (event.target.matches('#div-two-a')) {
            myorder.setMainProperties("Dinner");
            behaveTime("Dinner");
            el = document.getElementById('div-two');
            el.style.display = 'block';
        };

    };
}; 
const numberDishes = (order) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (order.total_counter > 0){
            document.getElementById('orders-submit-button').style.display = "block";
            resolve('Now you can order');
        }else {
            document.getElementById('orders-submit-button').style.display = "none"

            reject('CHOOSE YOUR OPTIONS');
        }
      }, 1000); 
    });
  }
  
const activateSubmit = (order) => {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (order.offer_price_applied > 0 )
            {
                resolve(' with an OFFER APPLIED!!');
            }else{
                reject(' but you have NO OFFER APPLIED');
            }
    
    }, 2000);
});
}

async function activateOrder(numberDishes, activateSubmit) {
    try {
        document.getElementById('orders-promises').innerHTML = '';
        document.getElementById('orders-promises-ad').innerHTML = '';
        const returnedDishes = await numberDishes;
        document.getElementById('orders-promises').innerHTML = returnedDishes;

        const onOffSubmit = await activateSubmit;
        document.getElementById('orders-promises-ad').innerHTML = onOffSubmit;
    }catch (err) {
        throw err.message;
    }
}
  

function printScreenOrder (order){
    try {
        var div_orders = document.getElementById('orders-container');
        div_orders.innerHTML = order.returnDishes();
        div_orders = document.getElementById('orders-total-dishes');
        div_orders.innerHTML = ` ${order.total_counter} dishes `;
        div_orders = document.getElementById('orders-total-at-moment');
        div_orders.innerHTML = ` Total (with no offers): ${order.total_price}€ `;

        div_orders = document.getElementById('orders-offer-price-applied');
        div_orders.innerHTML = ` Applied Offer: ${order.offer_price_applied}€ `;

        div_orders = document.getElementById('orders-offer-price-out');
        div_orders.innerHTML = ` Out of Offer: ${order.price_out_of_offer}€ `;
       
        div_orders = document.getElementById('orders-total-final-price');
        div_orders.innerHTML = ` Final Price: ${order.total_price_considering_offers}€ `;

        div_orders = document.getElementById('orders-saved-amount');
        div_orders.innerHTML = ` Saved Amount: ${order.saved_amount}€ `;
    }catch (err) {
        throw err.message;
      }  
}
function behaveTime(type_meal) {
    try {
        el = document.getElementById('div-zero');
        el.style.display = 'none';
        el = document.getElementById('div-one');
        el.style.display = 'none';      
        el = document.getElementById('div-two');
        el.style.display = 'none'; 
        el = document.getElementById('abs-offers');    
        el.style.display = 'none';    
        el = document.getElementById('options-container');
        el.style.display = 'block';
        el = document.getElementById('orders-wrapper');
        el.style.display = 'block';
        el = document.getElementById('options-container');
        el.style.display = 'block';
        el = document.getElementById('comment-wrapper');
        el.style.display = 'block';

        let welcome = type_meal === "Breakfast" ? " Make me know when you Choose the ingredients you want" : "Make me know when you decide What is the main course you would like to order?" ;
        el = document.getElementById('comment-dishes');
        el.innerHTML = `<h2>Welcome.</h2> <p>Have a seat and have a look to our ${type_meal} menu.</p> <p> ${welcome}.</p>`;
    }catch (err) {
        throw err.message;
      }  
}

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
        this.main_type = type;
        this.offer_price = this.main_type === "Breakfast" ? this.breakfast_offer : this.main_type === "Lunch" ? this.lunch_offer: this.dinner_offer ;
    },
    saveDishes: function (dishes){
        let new_dish = this.dish_asked(dishes);
        this.dishes_values.push(new_dish);
        this.computeCounters();
        return this.returnMessages();

    },
    dish_asked: function (dish_string) {
        let str_01 = dish_string.split("</div>");
        let dish_type = str_01[0].replace('<div class="hidden">','');
        let str_02 = str_01[1].split("</h4>");
        let dish_name = str_02[0].replace("<h4>","");
        let str_03 = str_02[1].split("</h5>");
        let str_04 = str_03[0].replace("<h5>","");
        let dish_price = str_04.replace("€","");
        var or_dish = {
            "type": dish_type,
            "name": dish_name,
            "price": dish_price 
        };
        return or_dish;
    },
    deleteDishes: function (index){
        this.dishes_values.splice(index,1);
        this.computeCounters();
        return this.returnMessages();
    },
    returnDishes: function () {
        let contenido = '';
        for (i=0; i< this.dishes_values.length;i++) {
            contenido =` ${contenido}<div><button class="btn-delete-option">X</button>  ${this.dishes_values[i].name}: ${this.dishes_values[i].price}€<div class="hidden"> (${i}) ${this.dishes_values[i].type} </div></div>`;
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
        for (i=0; i< this.dishes_values.length;i++) {
            lista.push(parseFloat(this.dishes_values[i].price)); 
        };
        this.prices_values = lista;
        this.total_price = 0;
        if (this.total_counter > 0) {
            let reducer = (accumulator, curr) => accumulator + curr;
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
                this.number_offers = Math.floor(this.sub_counter / this.main_counter);
                n_main_elems_out_of_offer = 0;
                n_sub_elems_out_of_offer = this.sub_counter -(this.main_counter * value_root) ;

                message = `Maybe you should ask for another main course`;
                let siders_left = value_root - n_sub_elems_out_of_offer;

                if (siders_left > 0) {
                    message = `Maybe you should ask for another main course and ${siders_left} siders to join a new offers`;
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

                message = 'Maybe you should choose more siders and we will apply another offer';
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
            for (i=0; i < res_end.length; i++){
                suma = suma + parseFloat(res_end[i]);
            }
        }

        return suma;
    },
    computeSum: function (my_arr){
        let reducer = (accumulator, curr) => accumulator + curr;
        return parseFloat(my_arr.reduce(reducer)); 
    }
}

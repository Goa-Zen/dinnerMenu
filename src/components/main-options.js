export const MainOptions = [
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



export function timeMessage(hour) {
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
};

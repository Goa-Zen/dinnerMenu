const MainOptions = [
    {
      "name": "OFFERS",
      "type": "offers"
    },
    {
      "name": "BREAKFAST",
      "type": "breakfast-dishes"
    }, 
    {
      "name": "LUNCH / DINNER",
      "type": "main-dishes"
    },  
    {
      "name": "BREAKFAST EXTRAS",
      "type": "breakfast-extras"
    }, 
    {
      "name": "LUNCH / DINNER SIDES",
      "type": "main-sides"
    }     
   ];

function showOptions() {
    let contenido = '<div class="main-options-wrapper">';
    for (var key in MainOptions) {
      contenido = ` ${contenido} <div class="main-option">  ${MainOptions[key].name} </div>`;
    }
    contenido = ` ${contenido} </div>`;
  
    return contenido;
    // document.getElementById('main-options').innerHTML = contenido;
    // return true;
   }

  
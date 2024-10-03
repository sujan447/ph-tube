//1) Fetch, Load and Show Catagories on html



// create loadCatagories
const loadCategories = () => {
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => showCategories(data.categories))
    .catch(error => console.error(error))
}

//create showCatagories
const showCategories = (categories) =>{
   const categoriesContainer = document.getElementById('categories');
   categories.forEach((item) => {
    console.log(item);
    //create buttons
    const buttons = document.createElement('button');
    buttons.classList = 'btn';
    buttons.innerText = item.category;

    //add buttons
    categoriesContainer.appendChild(buttons);
    
   })
    
}

loadCategories()
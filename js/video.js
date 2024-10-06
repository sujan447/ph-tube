function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond}second ago`
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('btn-categories');
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active');
    }
    
}

//1) Fetch, Load and Show Catagories on html
// create loadCatagories
const loadCategories = () => {
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories))
        .catch(error => console.error(error))
}

const loadCategoriesVideos = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass()
        showVideos(data.category)
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active")
       
        
    })
    .catch(error => console.error(error))
}


const loadVideos = (searchText = '') => {
    // fetch the data 
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => showVideos(data.videos))
        .catch(error => console.error(error))
}

const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    showDetails(data.video);
    
    
}

const showDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML = `
    <img src=${video.thumbnail}/>
    <p>${video.description}</p>
    `

    //way-1
    document.getElementById('showModalData').click();

    //way-2
    //  document.getElementById('modalContainer').showModal()
    
}
// const videoDemo = {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }
    


const showVideos = (videos) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = "";

    if (videos.length === 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
        <div class = 'min-h-[300px] flex flex-col justify-center items-center gap-5'>
            <img src="assets/Icon.png" />
        </div>
        <h2 class = "text-2xl text-center font-bold">
            No Content on this Category
        </h2>
        `
        return;
    } else {
        videosContainer.classList.add('grid')
    }
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
  <figure class = 'h-[200px]' relative>
    <img
      src= ${video.thumbnail}
      alt="Shoes" class = 'h-full w-full object-cover' />
      ${video.others.posted_date?.length === 0 ? "" : `<span class='absolute right-2 bottom-32 text-xs bg-black text-white rounded p-1'>${getTimeString(video.others.posted_date)}</span>` }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img  class= 'w-10 h-10 rounded-full object-cover' src= ${video.authors[0].profile_picture} />
    </div>
    <div>
      <h1 class= 'font-bold'> ${video.title}</h1>
      <div class='flex items-center gap-2'>
        <p class= 'text-gray-400'> ${video.authors[0].profile_name}</p>
         ${video.authors[0].verified === true ?  "<img class='w-5' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png' />" : ''}
      </div>
      <p class='text-gray-400'> ${video.others.views}</p>
         <p> <button onclick="loadDetails('${video.video_id}')" class = 'btn btn-sm btn-error'> Details</button></p>
  </div>
    </div>
         
        `;

        videosContainer.append(card);
    })

}

//create showCatagories
const showCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);
        //create buttons
        // const buttons = document.createElement('button');
        // buttons.classList = 'btn';
        // buttons.innerText = item.category;
            const buttonContainer = document.createElement('div');
            buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class= "btn btn-categories">
            ${item.category}
            </button>
            `

        //add buttons
        categoriesContainer.appendChild(buttonContainer);

    })

}
document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value)
})
loadCategories();
loadVideos()
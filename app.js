const loadAllCatagoryNews = async () => {
   try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    return (data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}


const setAllMenu = async () => {
    const data = await loadAllCatagoryNews();
    //console.log(data);
   
    const allMenu = document.getElementById('all-menu');
      
    const unique = [];
  
   for (const news of data) {
        //console.log(news);
         if (unique.indexOf(news.category_name) === -1) {  
        unique.push(news.category_name);
        const li = document.createElement('li');
             li.innerHTML = `
        <li onclick="loadAllNews('${news.category_id}')+ spinner('${true}')" class="nav-item">
         
            <a class="nav-link" aria-current="page" href="#">${news.category_name}</a>
        </li>
             `;
             allMenu.appendChild(li);
             
        } 
    }
   
}

setAllMenu();


const loadAllNews = async (category_id) => {
    try{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
      
    allNewsCalegory(data.data);
     }
    catch (error) {
        console.log(error);
    }
    }


const allNewsCalegory = (news) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
  
    const inputField = document.getElementById('input-field');
    inputField.value = `${news.length ? news.length + ' News Found' : 'Not Found any News'}`;
    
    news.sort((a, b) => b.total_view - a.total_view);
    news.forEach(news => {
         
         const { title, author,details,thumbnail_url,total_view,_id} = news;
        console.log(news.total_view);
      
         const newDiv = document.createElement('div');
        newDiv.innerHTML = `
           <div class="card mb-3 rounded-3 shadow-sm" style="max-width: full;">
           <div class="row g-0">
        <div class="col-md-4">
            <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0,300) +'...'}</p>
                <div class="d-flex justify-content-sm-between align-content-sm-between">
                <div class="mt-3 w-25 d-flex pt-4">
                 <img src="${author.img}" class="img-fluid rounded-circle w-25"alt="...">
                <div class="ms-2">
                 <p>${author.name? author.name:'Not Found'}</p>
                 
                <p>${author.published_date ? author.published_date : 'Not Found'}</p>
                </div>
                </div>
                <div class="ms-sm-3 mx-lg-5 mt-5 pt-4">
                <p><i class="fa-regular fa-eye"></i> ${total_view ? total_view:'0'}</p> 
                </div>
              
                <div class="d-none d-lg-flex  mx-5 mt-5 pt-4 ">
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
               
               </div>
                <div class="mx-5 mt-5 pt-4">
                <button onclick="showAllDetails('${_id}')" type="button" class="btn btn-secondary me-sm-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
                
        `;
        newsContainer.appendChild(newDiv)
    })
      spinner(false);
}


const showAllDetails = async(news_id) => {
    try{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    const data = await res.json()
    //console.log(data.data[0]);
    showAllWaterDetails(data.data[0]);
     }
    catch (error) {
        console.log(error);
    }
}

const showAllWaterDetails = (data) => {
     console.log(data);
    const modalDetails = document.getElementById('modale-container');
   
         const { title, author,details,thumbnail_url,total_view,_id} = data;
         modalDetails.innerHTML = `
            <div class="modal-header">
            
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div><img src="${thumbnail_url}" class="card-img-top" alt="..."></div>
            <div class="modal-body">
               ${details.slice(0,300) +'...'}
            </div>
            <div class="d-flex">
                <div class="mt-3 w-25 d-flex pt-4">
                 <img src="${author.img}" class="img-fluid m-3 rounded-circle "alt="...">
                <div class="ms-2">
                 <p>${author.name? author.name:'Not Found'}</p>
                <p>${author.published_date ? author.published_date : 'Not Found'}</p>
                <div class="">
                <p><i class="fa-regular fa-eye"></i> ${total_view ?total_view:'0'}</p>
                </div>
                </div>
                </div>
                
                </div>
   `; 
   
}
 
const spinner = isloding => {
    const spinner = document.getElementById('spinner');
    if (isloding) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}
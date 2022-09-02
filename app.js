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
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">${news.category_name}</a>
        </li>
             `;
        allMenu.appendChild(li);
        }
    }
}
setAllMenu();



const loadAllNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);
    const data = await res.json();
     console.log(data.data);
    allNewsCalegory(data.data);
    }
loadAllNews();

const allNewsCalegory = (news) => {
    const newsContainer = document.getElementById('news-container');
    news.forEach(news => {
         const { title, author, image_url,details,thumbnail_url,total_view} = news;
        //console.log(news);
        newsContainer.innerHTML = `
          <div class="row g-0">
        <div class="col-md-4">
            <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0,300)}</p>
                <div class="d-flex">
                <div class="mt-3 w-25 d-flex pt-4">
                 <img src="${author.img}" class="img-fluid rounded-circle w-25"alt="...">
                <div class="ms-2">
                 <p>${author.name}</p>
                <p>${author.published_date}</p>
                </div>
                </div>
                <div class="mx-5 mt-5 pt-4">
                <p><i class="fa-regular fa-eye"></i> ${total_view}</p>
                </div>
                <div class="d-flex mx-5 mt-5 pt-4">
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
                <div class="ms-5 mt-5 pt-4">
                <button type="button" class="btn btn-secondary">Show Details</button>
                </div>
                </div>
            </div>
        </div>
                </div>
        `; 
    })

}

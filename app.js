const loadAllNews = async () => {
   // try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    return (data.data.news_category);
    // }
    // catch (error) {
    //     console.log(error);
    // }
}


const setAllMenu = async () => {
    const data = await loadAllNews();
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
//loadAllNews();

const categoryList = document.querySelector(".category-list");
const axios = require('axios').default;

const bookCardList = document.querySelector(".bookCard-list");
const bookCard =document.querySelector(".bookCard");
categoryList.addEventListener('click', onCategoryListClick);


 async function getCategoryList (){
    await axios.get(`https://books-backend.p.goit.global/books/category-list`).then(({data}) => {
    renderCategory(data)}).catch(err => console.log( 'error', err))
}
getCategoryList()

async function renderCategory(data){
    const markup =  await data.map(({list_name}) => `
    <li class = "category-list-item"> ${list_name} </li>
    `).join('');
    categoryList.innerHTML=markup;
}


function onCategoryListClick(event){
    bookCardList.innerHTML='';
    const idElem= event.target;

    if (idElem.tagName!=="LI"){
        return;
    } getBookByCategory(idElem.textContent.trim());
    const elem = document.querySelector('.categories__title-active');
if (elem){
    elem.classList.remove('categories__title-active');
}event.target.classList.add('categories__title-active');
  
}



async  function getBookByCategory(changeCategory){
        await axios.get(`https://books-backend.p.goit.global/books/category?category=${changeCategory}`).then(({data}) => renderedBookCardItem(data)
    )
    }

function renderedBookCardItem(data){
    console.log(data)
    const  markup = `
    <h2 class ="main-title">${data[0].list_name}</h2>
    <ul class=" bookCard-list">${data.map(({author ,book_image, description, title, _id }) =>
    `<li class="book-list-item">
    <div class="image-overlay">
    <img src="${book_image}" alt="${description} id= "${_id}" loading="lazy">
    <div class="image-description">
      <p class="image-overlay-description"> quick view  </p>
     </div>
      </div>
    <h3 class="title-book">${title}</h3>
    <p class="author-title"> ${author}</p>
    </li>`).join('')}
    </ul>
     `;
     bookCard.classList.remove("is-hiden");
    bookCard.innerHTML= markup;
    const titleElement = document.querySelector(".main-title");
    const titleText = titleElement.textContent;
    const words = titleText.split(' ');
    const lastWord = words[words.length - 1];
titleElement.innerHTML = titleText.replace(lastWord, `<span class="brendcolor">${lastWord}</span>`);
   
}


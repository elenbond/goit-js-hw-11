import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import throttle from 'lodash.throttle';
import pictureCards from './templates/pictureCards.hbs';
import imageApi from './js/fetchImages.js';

const form = document.querySelector(".search-form");
const buttonLoadMore = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");
// const loadSpinner = document.querySelector('#loading-container');

Notiflix.Notify.init({
    timeout: 1500,
});

const searchImage = new imageApi ();                             
const lightbox = new SimpleLightbox('.gallery a'); 

let bottomReached = false;

const clearPreviousResult = () => {
    gallery.innerHTML = '';
}

const showLoading = () => {
    buttonLoadMore.classList.remove('is-hidden'); 
    // loadSpinner.classList.remove('is-hidden');
}

const hideLoading = () => {
    buttonLoadMore.classList.add('is-hidden');  
    // loadSpinner.classList.add('is-hidden');
}

const addImageCard = (hits) => {
    const markup = pictureCards(hits); 
    gallery.insertAdjacentHTML("beforeend", pictureCards(markup));
    showLoading();                     

}

const onSearchHits = () => {                                                     
    if (searchImage.totalHits === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again..");      
        hideLoading();                                                                    
    }
}

const onSearchImageSubmit = async (event) => {
    event.preventDefault();
    clearPreviousResult();
    const value = event.currentTarget.elements.searchQuery.value;
    if (value === '') {
        Notiflix.Notify.failure("Please fill in the field!");
        return;
    }
    searchImage.query = value;
    searchImage.resetPage();                                       
    try {
        await searchImage.fetchImages()
            .then(addImageCard);
        if (searchImage.totalHits !== 0) {
            Notiflix.Notify.success(`Hooray! We found ${searchImage.totalHits} images.`)
        }
        scrollToTop();                                                             
        onSearchHits();
        lightbox.refresh(); 
    } catch (error) {
       console.log(error);
    }
}

const onLoadMore = async () => {
    if (bottomReached) {
        hideLoading();
        return;
    }
    hideLoading();
    searchImage.incrementPage();                                             
    await searchImage.fetchImages()                                   
        .then(addImageCard);                                    
    onSearchHits();                                                                  
    lightbox.refresh();    
        showLoading();
    if (searchImage.totalHits <= searchImage.getFetchElNum()) {
        bottomReached = true;                                                                           
        Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);                                                            
        hideLoading();
        return;                           
    }
}
const infiniteScroll = () => {                                                     
    const documentRect = document
    .documentElement.getBoundingClientRect();                                     
    if (documentRect.bottom < document
        .documentElement.clientHeight + 1400) {                                
        onLoadMore();                                                            
    }
}

function scrollToTop() {                                                         
  const { top: cardTop } = gallery.getBoundingClientRect();            
  window.scrollBy({                                                              
    top: cardTop - 100,                                                          
    behavior: 'smooth',                                                          
  });
}

form.addEventListener('submit', onSearchImageSubmit);                 
buttonLoadMore.addEventListener('click', onLoadMore);
window.addEventListener('scroll', throttle(infiniteScroll, 500));
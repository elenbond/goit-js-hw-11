// const renderImageCard = (imageCard) => {
//     const markup = imageCard
//         .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//         `<a href="${largeImageURL}" class="gallery__link" onclick="event.preventDefault()">
//             <div class = "photo-card">
//                 <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image"/>
//                 <img src="" alt="" loading="lazy" />
//                 <div class="info">
//                 <p class="info-item">
//                 <b>Likes</b>${likes}
//                 </p>
//                 <p class="info-item">
//                 <b>Views</b>${views}
//                 </p>
//                 <p class="info-item">
//                 <b>Comments</b>${comments}
//                 </p>
//                 <p class="info-item">
//                 <b>Downloads</b>${downloads}
//                 </p>
//                 </div>
//             </div>
//         </a>`
//         ).join('');
//     gallery.insertAdjacentHTML("beforeend", markup);
// }
// export default renderImageCard;
import axios from 'axios'; 
export default class imageApiService { 
    constructor() { 
        this.searchQuery = ''; 
        this.page = 1;
        this.perPage = 40;
        this.totalHits = 0;
    }
  
    async fetchImages() {
        const API_KEY = '27732054-5513c218cb3363c8c09534df6';       
        const URL = 'https://pixabay.com/api/';                 
        const parameters = new URLSearchParams({                     
            key: API_KEY,                                          
            q: this.query,                                          
            image_type: 'photo',                                    
            orientation: 'horizontal',                              
            per_page: this.perPage,         
            page: this.page,                  
        });
        const url = `${URL}?${parameters}`;    
        this.incrementPage();                       
        const response = await axios.get(url);         
        this.totalHits = response.data.totalHits;
        if (!response.data.hits) {                        
            throw new Error('Error');
        }
        return response.data.hits;
    }    

    getFetchElNum() {                                       
        return this.perPage * this.page;              
    }

    incrementPage() {                                       
        this.page += 1;
    }

    resetPage() {                                           
        this.page = 1;
    }

    get query(){                                               
        return this.searchQuery;
    }

    set query(newQuery){                                       
        this.searchQuery = newQuery;
        this.resetPage();
    }
 }
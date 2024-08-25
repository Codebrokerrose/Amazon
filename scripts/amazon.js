// // step 1. save the data 
// const products = [{
//     image:'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating:{
//         stars: 4.5,
//         count: 87
//     },
//     priceCents: 1090 
// },{
//     image:'images/products/intermediate-composite-basketball.jpg',
//     name:'Intermediate Size Basketball',
//     rating:{
//         stars: 4,
//         count: 127
//     },
//     priceCents: 2095 
// },{
//     image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name:'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating:{
//         stars: 4.5,
//         count: 56
//     },
//     priceCents: 799
// },{
//     image:'images/products/black-2-slot-toaster.jpg',
//     name:'2 Slot toaster - Black',
//     rating:{
//         stars: 5,
//         count: 2197
//     },
//     priceCents: 1899
// }];
//src="images/ratings/rating-${product.rating.stars * 10}.png"> .. line 60
// polymorphism .. line 86

//Step 3. import
import { cart , addToCart} from "../data/cart.js"; //name of the variable we wanna get under the curly bracket ( {cart as mycart} use this to rename) and  from the location where it is present
import { products ,loadProducts} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid(){

  let productsHTML = '';

  // step 2 - Generate the data loop throught the array
  // .toFixed conver a decimal in to a string and take how many decimal you need
  // products.forEach((product) =>{
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');
  
    let filteredProducts = products;
  
    // If a search exists in the URL parameters,
    // filter the products that match the search.
    if (search) {
      filteredProducts = products.filter((product) => {
        // return product.name.includes(search);
        let matchingKeyword = false;

        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });
  
        return matchingKeyword ||
          product.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  
    filteredProducts.forEach((product) => {
      productsHTML +=`
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}  

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart " data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;



  function updateCartQuantity(){
    let cartQuantity = 0;

          cart.forEach((cartItem) => {
              cartQuantity += cartItem.quantity;
          });

          document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;  
          localStorage.setItem('localCart', cartQuantity);
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
      button.addEventListener('click',() => {
          //how do we know which product to add?
          //Data Attribute
          //- is just another HTML attribute
          //- allows us to attach any information to an element
          
          const productId = button.dataset.productId;
          // name converted to kababcase(data-product-name) to camel case(button.dataset.productName)
          addToCart(productId);
          updateCartQuantity();
      });
  });
 
  // localStorage.setItem('localCart',document.querySelector('.cart-quantity').innerHTML) ;

    
  


  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`;
  });

  // Extra feature: searching by pressing "Enter" on the keyboard.
  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });

}


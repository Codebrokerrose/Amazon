//PROCEDURAL PROGRAMMING 
// PROCEDURE = A SET OF STEP BY STEP INSTRUCTION , A FUNCTION
// Step 2 : Export  .. now cart variable can be accessed outside of the file
export let cart;
loadFromStorage();
function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

    // if(!cart){
    //     cart =
    //         [{
    //             productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    //             quantity : 2,
    //             deliveryOptionId: '1'
    //         },{
    //             productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    //             quantity : 1,
    //             deliveryOptionId: '2'
    //         }];
    // }

}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
  
          cart.forEach((cartItem) => {
              if(productId === cartItem.productId){
                  matchingItem = cartItem;
              }
          });
  
          if(matchingItem) {
              matchingItem.quantity +=1;
          }
          else{
              cart.push({
                  productId : productId,
                  quantity: 1,
                  deliveryOptionId: '1'
              });
          }

    saveToStorage();
  }

export function removeFromCart(productId){
    // 1. create a new array 
    const newCart = [];
    // 2. loop through the cart 
    cart.forEach((cartItem) => {
        // 3. add each cart item to the new array , except for this productId
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart=newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
  
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart( fun){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load' , () =>{
      console.log(xhr.response);

      fun(); //callback
    });
  
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}

// Extra feature: make the cart empty after creating an order.
export function resetCart() {
    cart = [];
    saveToStorage();
}




// OOP : Organize our code into objects ,tries to represent the real world , easy to create ultiple objects
// Step 2 : Export  .. now cart variable can be accessed outside of the file

//OBJECT GENERATOR
class Cart{
    // cartItems = undefined;
    // localStorageKey = undefined;
    cartItems ; //public property
    #localStorageKey ; // # means private propery

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
        // cart.localStorageKey = 'cart-oop';
        // // businessCart.localStorageKey= 'cart-buisness';

        // cart.loadFromStorage();

        // cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        // console.log(cart);


        // businessCart.loadFromStorage();
    }

    #loadFromStorage() { //shorthand method
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if(!this.cartItems){
            this.cartItems =
                [{
                    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity : 2,
                    deliveryOptionId: '1'
                },{
                    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity : 1,
                    deliveryOptionId: '2'
                }];
        }
    
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        let matchingItem;
    
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
    
            if(matchingItem) {
                matchingItem.quantity +=1;
            }
            else{
                this.cartItems.push({
                    productId : productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
    
        this.saveToStorage();
    }

    removeFromCart(productId){
        // 1. create a new array 
        const newCart = [];
        // 2. loop through the cart 
        this.cartItems.forEach((cartItem) => {
            // 3. add each cart item to the new array , except for this productId
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
    
        this.cartItems=newCart;
    
        this.saveToStorage();
    }

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }

}


const cart = new Cart('cart-oop'); //instance
const businessCart = new Cart('cart-buisness');



console.log(businessCart);
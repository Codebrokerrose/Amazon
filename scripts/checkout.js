import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts ,loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';

// // another syntax without importing anything
// import '../data/cart-oop.js'; 
// import '../data/cart-class.js';

// import '../data/backend-practice.js';

//  Async await is a shortcut for promises ,async lets us use await
// Await  = lets us wait for a promise to finish , before going to the next line .
async function loadPage(){

    //error handling in async await
    try{

    
        // throw 'error1';
        await loadProductsFetch(); //lets us write asynchronous code like normal code , we can only use await,  inside an async function.Also the closest function has to be async 
        //async await can only be used with promises ( not with callbacks).
        const value = await new Promise((resolve,reject) => {  
            // throw 'error2'; 
            loadCart(() => {
                // reject('error3');
                resolve('value3');
            });
        });
    } catch (error){
        console.log('Unexpected error. Please try again later');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
//promise.all() -lets us run miltiple promises at the same time and wait for all of them to finish , create array of promises it will wait for all the promises to finish before going to the next step
Promise.all([
    // new Promise((resolve) => {
    //     loadProducts(() => {
    //         resolve('value1'); 
    //     });
         
    // }),
    loadProductsFetch(),
    new Promise((resolve) => {   
        loadCart(() => {
            resolve();
        });

    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/* 
//PROMISES HELPS TO KEEP OUR CODE FLAT, use promises instead of call backs
new Promise((resolve) => { //promise a build in function , it runs this inner function immediately , and resolve is a function which lets us control when to go to the next step
    // console.log('start promise');
    loadProducts(() => {
        // console.log('Finished loading');
        resolve('value1'); //resolve() lets us control when to go to the next step
    });
     
}).then ((value) => {
    return new Promise((resolve) => {   
        // console.log('next step');
        loadCart(() => {
            resolve();
        });

    }).then(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });

}) */



//Multiple callbacks cause a lots of nesting
// loadProducts( () => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

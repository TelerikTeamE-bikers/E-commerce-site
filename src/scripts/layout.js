import $ from 'jquery';
import Modal from './modules/modal';


console.log("here123");
console.log($('.modal').eq(1).html());
$('.modal').addClass('modal--is-visible');


let modal = new Modal();
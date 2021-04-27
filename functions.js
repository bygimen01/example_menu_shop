$(function show_img(){
    $('.svg-inline--fa').click(function(event) {
        var i_path = $(this).attr('src');

        $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
        $('#magnify').css({
            left: ($(document).width() - $('#magnify').outerWidth())/2,
            top: ($(window).height() - $('#magnify').outerHeight())/2
        });
        $('#overlay, #magnify').fadeIn('fast');
    });

    $('body').on('click', '#close-popup, #overlay', function(event) {
        event.preventDefault();
        $('#overlay, #magnify').fadeOut('fast', function() {
            $('#close-popup, #magnify, #overlay').remove();
        });
    });
});

let condition = [1, 0, 0];
let filtrs = ['bez_doplaty', 'welur', 'plecionka', 'ekoskora'];
let current = 0;
let blocks = document.querySelectorAll('.block');
let products = document.querySelectorAll('.' + blocks[current].classList[1] + ' .product');
let all_products = document.getElementsByClassName('product');
let descriptions = document.getElementsByClassName('block_description');
let secont_class = blocks[1].classList[1];
let tkanina_items = document.querySelectorAll('.first .product');
let kolor_items = document.querySelectorAll('.kolor .product');
let uklad_items = document.querySelectorAll('.uklad .product');

function event_btn() {
    let event_text = document.querySelectorAll('.block_event');
    let padding_text = document.querySelectorAll('.block_header .selection');
    for (let i = 0; i<condition.length; i++){
        if (condition[i]==1){
            condition[i]=0;
            event_text[i].textContent = 'wybierz';
        } else if (condition[i] == 2){
            event_text[i].textContent = 'zmień';
        }
    }

    for (let i = 0; i<condition.length; i++){
        if ((i == current) && condition[i]!=2){
            condition[i] = 1;
            event_text[i].textContent = 'wybieram';
            padding_text[i].style.paddingTop = '20px';
        }
    }

}

function filter(value) {
    show_products(false);
    for (let i = 0; i < products.length; i++){
        if (products[i].classList.contains(filtrs[value])){
            continue;
        } else {
            products[i].style.display = 'none';
        }
    }
}

document.addEventListener('click', function (filtr) {
    if (filtr.target.classList.contains('filter')){
        let el = filtr.target;
        try {
            filter(el.attributes[1].value[0])
        } catch (e) {
            show_products(false);
        }

    }
});

document.addEventListener('click', function (e) {

    if (e.target.classList.contains('product_description')){
        for (let i = 0; i < products.length; i++){
            selected_product = products[i];
            chose_img_src = products[i];
            chose_img_src = chose_img_src.getElementsByTagName('img');
            clear_products();
        }


        let current_desc = document.querySelector('.' + blocks[current].classList[1] + ' .block_header .content .selected_product');
        current_desc.innerHTML = '<p class="active_block_description">' + selected_product.textContent+ '</p>';
        if (condition[++current]!=2){
            event_btn();
            products = document.querySelectorAll('.' + blocks[current].classList[1] + ' .product');
            current_section(current);
        }

    }

});

document.addEventListener('click', function (change_item) {

});

function clear_products() {
    let description = document.querySelector('.' + blocks[current].classList[1] + ' .block_description');
    let event_button = document.querySelector('.' + blocks[current].classList[1] + ' .selection');


    if (selected_product){
        event_btn();
        condition[current] = 2;
        event_button.innerHTML = "<img src=\"" + chose_img_src[0].currentSrc + "\" alt=\"\">\n" +
            "                <a class=\"block_event\" src=" + current + '>zmień</a>';
        hide_products();
    }

}

function hide_products(value=true){
    for (let i = 0; i<all_products.length; i++){
        all_products[i].style.display = 'none';
    }

    if (value){
        for (let i = 0; i<descriptions.length; i++){
            descriptions[i].style.display = 'none';
        }
    }
}


function current_section(value){
    hide_products();

    if (value == '0'){
        let description = document.querySelector('.first .content .block_description');
        description.style.display = 'flex';
        for (let i = 0; i<tkanina_items.length; i++){
            tkanina_items[i].style.display = 'block';
        }
    }

    if (value == '1'){
        let description = document.querySelector('.kolor .content .block_description');
        description.style.display = 'flex';
        for (let i = 0; i<kolor_items.length; i++){
            kolor_items[i].style.display = 'block';
        }
    }

    if (value == '2'){
        let description = document.querySelector('.uklad .content .block_description');
        description.style.display = 'flex';
        for (let i = 0; i<uklad_items.length; i++){
            uklad_items[i].style.display = 'block';
        }
    }
}


function clicker(change_section){
    if ((change_section.target.classList.contains('block_event')) || change_section.target.classList.contains('block_title')){
        current = change_section.target;
        current = current.attributes[1].value[0];
        event_btn();
        products = document.querySelectorAll('.' + blocks[current].classList[1] + ' .product');
        current_section(current);
    }
}

document.addEventListener('click', clicker);

function show_products(value){
    hide_products(value);
    for (let i = 0; i<products.length; i++){
        products[i].style.display = 'block';
    }

    for (let i = 0; i<products.length; i++){
        products[i].style.display = 'block';
    }
}

function non_active() {
    for (let i = 0; i<blocks.length; i++){
        if (blocks[i].classList.contains('active')){
            continue;
        } else {
            let elemtnts = blocks[i].querySelectorAll('.block_images .product');
            for (let i = 0; i<elemtnts.length; i++){
                elemtnts[i].style.display = 'none';
            }
        }
    }
}

non_active();

event_btn();
current_section(current);

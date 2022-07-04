'use strict';


window.addEventListener('DOMContentLoaded', () => {


    const tabs          =    document.querySelectorAll('.tabheader__item'),
          tabsContent   =    document.querySelectorAll('.tabcontent'),
          tabsParent    =    document.querySelector('.tabheader__items');


    function hideTabContent() {

        tabsContent.forEach(item => {

            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {

            item.classList.remove('tabheader__item_active');

        });

    }

    function showTabContent(i = 0) {

        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);


    tabsParent.addEventListener('click', (e) => {

        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {

                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });


        }

    });

    const deadline = "2022-6-30";

    function getTimeRemaining(endtime) {

        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date());


        if (t <= 0) {
            days    = 0;
            hours   = 0;
            minutes = 0;
            seconds = 0;
        } else {
                days    = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours   = Math.floor((t / (1000 * 60 * 60)) % 24),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60);
        }

        return {
            'total'  : t,
            'days'   : days,
            'hours'  : hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }


    }


    function setClock(selector, endtime) {

        const timer      =    document.querySelector('.timer'),
            days         =    document.querySelector('#days'),
            hours        =    document.querySelector('#hours'),
            minutes      =    document.querySelector('#minutes'),
            seconds      =    document.querySelector('#seconds'),
            timeInterval =    setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {

            const t = getTimeRemaining(endtime);

            days.innerHTML       =     getZero(t.days);
            hours.innerHTML      =     getZero(t.hours);
            minutes.innerHTML    =     getZero(t.minutes);
            seconds.innerHTML    =     getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            } else {

            }
        }

    }


    setClock('timer', deadline);


    const modalTrigger    =    document.querySelectorAll('[data-modal]'),
          modal           =    document.querySelector('.modal');


    function closeModal() {

        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';

    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {

        btn.addEventListener('click', openModal);




        modal.addEventListener('click', (e) => {

            if (e.target === modal || e.target.getAttribute('data-close') == "") {

                closeModal();
            }

        });

        document.addEventListener('keydown', (e) => {

            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();

            }

        });
    });


    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {

        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }



    window.addEventListener('scroll', showModalByScroll);



     class MenuCard {
        constructor(src,alt,description,title,price,parentSelector){
            this.src            = src;
            this.alt            = alt;
            this.description    = description;
            this.title          = title;
            this.price          = price;
            this.parent         = document.querySelector(parentSelector);
            this.transfer       = 55;
            this.changeToRub();


        }
        changeToRub(){
            this.price = this.transfer * this.price;
        }
        render(){
            const element = document.createElement('div');

            element.innerHTML = `
            <div class="menu__item">
        <img src= ${this.src} alt= ${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
          </div>
               </div>`;
               this.parent.append(element);
        }


     }

     new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        20,
        ".menu .container"
    ).render();
    
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        50,
        ".menu .container"
    ).render();
    
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        15,
        ".menu .container"
    ).render();


    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

        forms.forEach(item => {
            posData(item);
        });
        

       function posData(form){
        form.addEventListener('submit',(e)=>{
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

           

            const formData = new FormData(form);
        
            const object = {};

            formData.forEach(function(value,key){
                object[key] = value;
            });

            

            fetch('server.php',{
                method:"POST",
                headers:{
                    'Content-type':'application-form/json; charset=utf-8'
                },
                body:JSON.stringify(object)

            }).then(data=> data.text())
              .then(data =>{

                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();

            }).catch(()=>{

                showThanksModal(message.failure);

            }).finally(()=>{

                form.reset();
                
            });
        });
    }
            
       


       function showThanksModal(message){

        const prevsModalDialog = document.querySelector('.modal__dialog');

        prevsModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        
        <div class="modal__content">

        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        
        </div>
        
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevsModalDialog.classList.add('show');
            prevsModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);


       }


});
$(function(){
    /** 
    * 상단배너 닫기
    * @version 1.0.0
    * @since 2022-06-08
    * @author 이유라 (Nico)
    * @memo 
    */
    $('.header-area .btn-close').click(function(){
        $('.top-banner').addClass('close');
    })
   

    



    /** 
    * 메인 비주얼 슬라이드
    * @version 1.0.0
    * @since 2022-06-08
    * @author 이유라 (Nico)
    * @memo 
    */

    var mainSwiper = new Swiper(".sc-visual .swiper", {
        loop:true,
        autoplay:{
            delay:3000,
            disableOninteraction :false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });




    /** 
    * 키워드 data
    * @version 1.0.0
    * @since 2022-06-14
    * @author 이유라 (Nico)
    * @memo 
    */
    fetch("https://leeyura-514.github.io/work03/asset/data/keyword.json")


    .then((res) => res.json())//res를 제이슨으로 받아라 (;없어야함, 계속 될거기 때문)
    .then((json) => {// 잘 실행되면 이 구역 실행
        console.log((json))

        let list = json.list;//변수 재할당 변수를 담음 (human의 list를 담음 list까지 접근)
        let HTML = "";

        list.forEach(keyword=> { //keyword자리는 el로 대체 가능 대신 밑에도 변수를el를 바꿔줘야함
            // console.log(human);
            // html + 이름 = html
            // html + dfdf = html 이런 식으로  + 로 변수에 담을 수 잇음!

            HTML += `<a href="" class="keyword-item">${keyword.name}</a>`//`${human.이름} : 변수를 보관 & 

        });
        $('.keyword-list').append(HTML);
    })//






    /** 
    * 이벤트제품 data & 그리드 슬라이드
    * @version 1.0.0
    * @since 2022-06-09
    * @author 이유라 (Nico)
    * @memo 
    */


    fetch("https://leeyura-514.github.io/work03/asset/data/product.json")
    
    .then((res) => res.json())
    .then((json) => {
        console.log((json))
        
        let list = json.list;
        let HTML = "";
        
        list.forEach(prd=> {
            //** 대괄호 > 중괄호 순으로 작성되었다면 : ${prd.price[0].priceCurrent}
            //**중괄호 하나로만 작성되었다면 ${prd.desc.title}
            console.log(prd.desc.title)//desc의 0번째
            console.log(prd.desc.desc)//desc의 0번째

            // * console.log(prd.desc[0].title)//desc의 0번째
            // * console.log(prd.desc[1].desc)//descd의 1번재 desc를 의미함
            HTML +=`
            <div class="swiper-slide prd-item">
            <a href="${prd.link}">
                <div class="img-box">
                    <div class="img front"><img src="${prd.thumbImg01}" alt="${prd.desc.title}"></div>
                    <div class="img back"><img src="${prd.thumbImg02}" alt="${prd.desc.title}"></div>
                </div>
                <div class="info-box">
                    <strong class="name">${prd.desc.title}</strong>
                    <p class="price">${prd.price[0].priceCurrent}<s>${prd.price[1].priceOriginal}</s><span class="sale">${prd.price[2].priceDiscunt}</span></p>
                    <span class="review">${prd.review[0].reviewGrade} (${prd.review[1].reviewCnt})</span>
                </div>
            </a>
            </div>
        `;
        });
        $('.sc-event .swiper-wrapper').append(HTML);

        // @ 스와이퍼는 동시에 실행되도록 안에 넣기
        var swiper = new Swiper(".sc-event .swiper", {
            loop:true,
            slidesPerView: 4,
            slidesPerGroup:8,
            speed:800,//속도 부드럽게
            grid: {
              rows: 2,
            },
            spaceBetween: 8,
           
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });//

 


    


    /** 
    * 실시간 판매 랭킹, 조회 랭킹 선택 + 베스트제품 스와이퍼
    * @version 1.0.0
    * @since 2022-06-09
    * @author 이유라 (Nico)
    * @memo
    * issue : 제품 미리보기 및 주요제품 이외에 opcity 처리 
    */
    
    
    $('.btn-lanking:first-child').addClass('active').siblings().removeClass('active');

    $('.btn-lanking').click(function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').siblings().removeClass('active');
            
        }else{
            $(this).addClass('active').siblings().removeClass('active');

        }
    });

    fetch("https://leeyura-514.github.io/work03/asset/data/product.json")


    .then((res) => res.json())
    .then((json) => {
        console.log((json))

        let bestList = json.bestList;
        let HTML = "";

        bestList.forEach(prd=> { //keyword자리는 el로 대체 가능 대신 밑에도 변수를el를 바꿔줘야함
            HTML += `
            <a href="" class="swiper-slide prd-item">
                <em class="badge">${prd.badge}</em>
                <img src="${prd.thumbImg01}" alt="${prd.desc[0].title}">
                <div class="info-box">
                    <strong class="name">${prd.desc[0].title}</strong>
                    <p class="price">${prd.price[0].priceCurrent}<s>${prd.price[1].priceOriginal}</s><span class="sale">${prd.price[2].priceDiscunt}</span></p>
                </div>
            </a>
            `;

        });
        $('.sc-best .swiper-wrapper').append(HTML);

        var bestSwiper = new Swiper(".sc-best .swiper", {
            loop:true,
            lazy : {
                loadPrevNext : true //이전, 다음 이미지는 미리 로딩
            },
            autoplay:{
                delay:1000,
                disableOninteraction :false,
            },
            
            slidesPerView: 4,
            observer: true,
            observeParents: true,
            spaceBetween: 20,
            breakpoints: {
                320: {  slidesPerView: 2,  spaceBetween: 20,  },
                500: {  slidesPerView: 3,  spaceBetween: 20,  },
                768: {  slidesPerView: 4,  spaceBetween: 20,  },
            },
           
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    })//






    
    /** 
    * 신제품 data & 스와이퍼
    * @version 1.0.0
    * @since 2022-06-10
    * @author 이유라 (Nico)
    * @memo 
    */
    fetch("https://leeyura-514.github.io/work03/asset/data/product.json")

    .then((res) => res.json())
    .then((json) => {
        console.log((json))

        let newList = json.newList;
        let HTML = "";

        newList.forEach(prd=> { 
            HTML += `
            <div class="swiper-slide">
                <a href="" class="prd-item">
                    <img src="${prd.thumbImg01}" alt="${prd.desc[0].title}">
                    <div class="info-box">
                        <em class="badge">${prd.badge}</em>
                        <strong class="name">${prd.desc[0].title}</strong>
                        <span class="desc">${prd.desc[1].desc}</span>
                    </div>
                </a>
            </div>
            `;

        });
        $('.sc-new .swiper-wrapper').append(HTML);

    
        var newSwiper = new Swiper(".sc-new .swiper", {
            loop:true,
            slidesPerView: 2,// 한줄당 보여지는 슬라이드 갯수
            // slidesPerColumn: 2,//단 개수가 아니라, css로 행높이 부여해야함
            slidesPerGroup:2,// 1페이지당 그룹 갯수
            speed:800,//속도 부드럽게
            
            grid: {
              rows: 2,
            },
            spaceBetween: 16,
    
          
            navigation: {
               nextEl: ".sc-new .swiper-button-next",
               prevEl: ".sc-new .swiper-button-prev",
           },
       });
    })//








    /** 
    * 제품리뷰 data & 스와이퍼 & hover 시, 내용박스 위로 올라옴
    * @version 1.0.0
    * @since 2022-06-10
    * @author 이유라 (Nico)
    * @memo
    * issue :  
    */
    fetch("https://leeyura-514.github.io/work03/asset/data/product.json")

    .then((res) => res.json())
    .then((json) => {
        console.log((json))
        
        let reviewList = json.reviewList;
        let HTML = "";
        
        reviewList.forEach(prd=> {
            HTML +=`
            <a href="" class="swiper-slide prd-item">
                <img src="${prd.thumbImg01}" alt="${prd.desc[0].title}">
                <div class="cont-box">
                    <strong class="name">${prd.desc[0].title}</strong>
                    <span class="desc">${prd.desc[1].desc}</span>
                    <span class="review">${prd.review[0].reviewGrade} (${prd.review[1].reviewCnt})</span>
                </div>
            </a>
            `;
        });
        $('.sc-review .swiper-wrapper').append(HTML);

        var reviewSwiper = new Swiper(".sc-review .swiper", {
            loop:true,
            lazy : {
                loadPrevNext : true
            },
            slidesPerView: 3,
            // slidesPerGroup:3,// 1페이지당 그룹 갯수
            spaceBetween: 15,
            speed:700,
            navigation: {
                nextEl: ".sc-review .swiper-button-next",
                prevEl: ".sc-review .swiper-button-prev",
            },
        });

        $('.sc-review .cont-box').hover(function(){
            $(this).addClass('active');
        },function(){
            $(this).removeClass('active');
    
        });


    });//







    /** 
    * 혜택리스트 data
    * @version 1.0.0
    * @since 2022-06-10
    * @author 이유라 (Nico)
    * @memo
    * issue :  
    */


    fetch("https://leeyura-514.github.io/work03/asset/data/benefit.json")

    .then((res) => res.json())
    .then((json) => {
        console.log((json))
        
        let benefitList = json.benefitList;
        let HTML = "";
        
        benefitList.forEach(bft=> {
            HTML +=`
            <li class="bft-item">
                <img src="${bft.thumbImg01}" alt="${bft.desc[0].title}">
                <p>${bft.desc[0].title}</p>
                <span>${bft.desc[1].desc}</span>
            </li>
            `;
        });
        $('.sc-benefit .bft-list').append(HTML);

    


    });//
 






})//end









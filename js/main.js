// 스크롤시 나타나고 클릭하면 탑으로 이동하는 버튼 만들기 
const backToTop = document.getElementById('backtotop');

function checkScroll() {

    let pageYOffset = window.pageYOffset;
    console.log(pageYOffset);

    if (pageYOffset !==0){
        backToTop.classList.add('show');
    }else{
        backToTop.classList.remove('show');
    }
}

function moveBackToTop() {
    if(window.pageXOffset > 0 ){
        window.scrollTo({ top:0, behavior: "smooth"})
    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);


/*----------------------------------------------------------------- */

function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    // 하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 갈 수 있음
    if (Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;

        // 왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 PREV 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        // 맨 왼쪽에 현재 보이는 카드가, 맨 첫번째 카드라면, 오른쪽 즉, NEXT 로 갈 수 없으므로 NEXT 버튼 비활성화
        if (Number(activeLi) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);    
}



function transformPrev(event) {
    // 현재 클릭 이벤트를 받은 요소, 즉 slide-prev 클래스를 가진 요소를 나타냄
    const slidePrev = event.target;
    // slide-prev 클래스를 가진 요소 다음 요소는 slide-next 클래스를 가진 요소임
    const slideNext = slidePrev.nextElementSibling;

    // ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

  /* classList.clientWidth 는 ul 태그의 실질적인 너비
   * liList.length * 260 에서 260 은 각 li 요소의 실질 너비(margin 포함)
   * activeLi 는 data-position 에 있는 현재 위치 
   * 즉, liList.length * 260 + Number(activeLi) 는 현재 위치부터 오른쪽으로 나열되야 하는 나머지 카드들의 너비
   */

  /* classList.clientWidth < (liList.length * 260 + Number(activeLi)) 의미는
   * 오른쪽으로 나열될 카드들이 넘친 상태이므로, 왼쪽으로 이동이 가능함
   */
  
   if (classList.clientWidth < (liList.length * 260 + Number(activeLi))) {
       // 위치를 왼쪽으로 260 이동 (-260px)
       activeLi = Number(activeLi) - 260;

       /* 위치를 왼쪽으로 260 이동 (-260px)
       * 해당 위치는 변경된 activeLi 값이 적용된 liList.length * 260 + Number(activeLi) 값임
       * 이 값보다, classList.clientWidth (ul 태그의 너비)가 크다는 것은
       * 넘치는 li 가 없다는 뜻으로, NEXT 버튼은 활성화되면 안됨
       */
      if (classList.clientWidth > (liList.length * 260 + Number(activeLi))) {
        slidePrev.style.color = '#cfd8dc';
        slidePrev.classList.remove('slide-prev-hover');
        slidePrev.removeEventListener('click', transformPrev);
      } 

       slideNext.style.color = '#2f3059';
       slideNext.classList.add('slide-next-hover');
       slideNext.addEventListener('click', transformNext);
   }

   classList.style.transition = 'transform 1s';
   classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
   classList.setAttribute('data-position', activeLi);
}




const slidePrevList = document.getElementsByClassName('slide-prev');




for(let i=0; i<slidePrevList.length; i++) {
    //ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');
    
    console.log(classList);
    console.log(liList)

    //카드가 ul태그 너비보다 넘치면 prev btn이 활성화! 
    if(classList.clientWidth < (liList.length *260)){
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev);
    }else{
        //카드가 넘치지 않아서 슬라이드 버튼 필요없는 경우 

        /*태그 삭제 시, 부모요소에서 removeChild 를 통해 삭제 
            1. 먼저 부모 요소 찾아서 찍기
            2. 부모 요소 자식 요소로 있는 prev와 next 버튼 삭제 
        */
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
};

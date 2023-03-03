
let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;

function processTouchMove(event) {
  // preventDefault() : 해당 요소의 고유의 동작을 중단시키는 함수 (이미지만 드레그로 이동하는 고유 동작 중단)
  event.preventDefault();

  // currentActiveLi: class-list 에서 data-position 으로 현재 카드 위치를 알아냄
  // touchstartX: 최초 요소의 x 좌표값
  // event.clientX: 드래그 중인 현재의 마우스 좌표값 
  // 즉, (Number(event.clientX) - Number(touchstartX)) 는 마우스가 얼만큼 이동중인지를 나타냄
  let currentX = event.clientX || event.touches[0].screenX;
  nowActiveLi = Number(currentActiveLi) + (Number(currentX) - Number(touchstartX));
  // 바로 즉시 마우스 위치에 따라, 카드를 이동함
  currentClassList.style.transition = 'transform 0s linear';
  currentClassList.style.transform = 'translateX(' + String(nowActiveLi) + 'px)';    
}

function processTouchStart(event) {
    mouseStart = true;

    // preventDefault() : 해당 요소의 고유의 동작을 중단시키는 함수 (이미지만 드레그로 이동하는 고유 동작 중단)
    event.preventDefault();
    touchstartX = event.clientX || event.touches[0].screenX;  //마우스 또는 터치 !!!!!!!
    currentImg = event.target;

    // 드래그 처리를 위해, 드래그 중(mousemove), 드래그가 끝났을 때(mouseup) 에 이벤트를 걸어줌
    currentImg.addEventListener('mousemove', processTouchMove);
    currentImg.addEventListener('mouseup', processTouchEnd);

    currentImg.addEventListener('touchmove', processTouchMove);
    currentImg.addEventListener('touchend', processTouchEnd);    

    currentClassList = currentImg.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position');

}

function processTouchEnd(event) {
    // preventDefault() : 해당 요소의 고유의 동작을 중단시키는 함수 (이미지만 드레그로 이동하는 고유 동작 중단)
    event.preventDefault();
    
    if (mouseStart === true) {
        currentImg.removeEventListener('mousemove', processTouchMove);        
        currentImg.removeEventListener('mouseup', processTouchEnd);  

        currentImg.removeEventListener('touchmove', processTouchMove);     //모바일   
        currentImg.removeEventListener('touchend', processTouchEnd);       //모바일    
        
        // 맨 처음 카드가 맨 앞에 배치되도록 초기 상태로 이동
        currentClassList.style.transition = 'transform 1s ease';
        currentClassList.style.transform = 'translateX(0px)';
        currentClassList.setAttribute('data-position', 0);

        // 맨 처음 카드가 맨 앞에 배치된 상태로 화살표 버튼도 초기 상태로 변경
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLiList = currentClassList.getElementsByTagName('li');
        if (currentClassList.clientWidth < (eachLiList.length * 260)) {
            eachSlidePrev.style.color = '#2f3059';
            eachSlidePrev.classList.add('slide-prev-hover');
            eachSlidePrev.addEventListener('click', transformPrev);

            eachSlideNext.style.color = '#cfd8dc';
            eachSlideNext.classList.remove('slide-next-hover');
            eachSlideNext.removeEventListener('click', transformNext);            
        }
        mouseStart = false;
    }
}

// 특정 요소를 드래그하다가, 요소 밖에서 드래그를 끝낼 수 있으므로, window 에 이벤트를 걸어줌
window.addEventListener('dragend', processTouchEnd);
window.addEventListener('mouseup', processTouchEnd);

// 인터페이스간의 오동작을 막기 위해, 카드 내의 이미지에만 드래그 인터페이스를 제공하기로 함 
const classImgLists = document.querySelectorAll('ul li img');
for (let i = 0; i < classImgLists.length; i++) {
    // 해당 요소에 마우스를 누르면, 드래그를 시작할 수 있으므로, 이벤트를 걸어줌
    classImgLists[i].addEventListener('mousedown', processTouchStart);
    classImgLists[i].addEventListener('touchstart', processTouchStart);
}


//touchstart, touchmove, touched -모바일 이벤트 


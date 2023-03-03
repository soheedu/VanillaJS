/* http GET/ POST 방식 axios 기반 통신
axios는 promise API를 지원함 */

function getNewsGet(){
    axios("http://loacalhost:8082/news", {
        method:"get",
        params:{
            email: "test@test.com"
        }
    }).then((response) =>{
        console.log(response.data['status'], response.data['info']);
        const newsMsg = document.querySelector('.news');
        newsMsg.innerText = response.data['info'];
    }).catch((error) =>{
        console.log(error);
    })
}
getNewsGet();
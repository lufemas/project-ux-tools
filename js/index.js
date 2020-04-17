
const $ = document
const $nextArticle = $.getElementById("next-article")
const $nextArticleTitle = $.getElementById("next-article-title")
const $nextArticleSeconds = $.getElementById("next-article-seconds")

const $articleTitle = $.getElementById("article-title")
const $articleBody = $.getElementById("article-body")

const articles = [
    {
        title : "Game Theory",    
        filename : "/articles/article-2.html",
    },
    {
        title : "You Should Be Coding in Your Physics Course",    
        filename : "/articles/article-3.html",
    },
    {
        title : "Braid Code Cleanup",    
        filename : "/articles/article-4.html",
    },
]

let nextArticleInterval 
let isNextArticleIntervalActive = false
let nextArticleSeconds = 10
let nextArticleIndex = peekAnArticle()

$nextArticleTitle.innerText = articles[nextArticleIndex].title + " ->"

let currentArticle = {
    title : "Javascript and the UI",    
    filename : "/articles/javascript-and-the-ui.html",
}



function loadArticle(articleIndex){

    articles.push(currentArticle)
    currentArticle = articles[articleIndex]
    articles.splice(articleIndex,1)
    $articleTitle.innerText = currentArticle.title
    let articleFileLoader = new XMLHttpRequest();
    articleFileLoader.open("GET", currentArticle.filename, true);

    articleFileLoader.onreadystatechange = function() {
        if (articleFileLoader.readyState === 4) {  // Makes sure the document is ready to parse.
          if (articleFileLoader.status === 200) {  // Makes sure it's found the file.
            allText = articleFileLoader.responseText; 
            //lines = articleFileLoader.responseText.split("\n"); // Will separate each line into an array
            $articleBody.innerHTML  = articleFileLoader.response;
            
          }
        }
      }
      articleFileLoader.send(null);

    
    // $articleBody.innerHTML =`<object type="text/html" data="${currentArticle.filename}" ></object>`
    console.log(articleIndex)
    console.log(currentArticle)
    console.log(articles)


}

function peekAnArticle() {
    return Math.floor( Math.random() * articles.length ) 
}


window.addEventListener('scroll', function(e) {

    
    const scrollYPercentage = window.scrollY/window.scrollMaxY;
    draw(scrollYPercentage);
    console.log(scrollYPercentage)
    console.log(nextArticleSeconds)
    console.log(isNextArticleIntervalActive)

    if (scrollYPercentage >= 0.98 ) {
        if (!isNextArticleIntervalActive){                   
            nextArticleInterval = window.setInterval( nextArticleIntervalHandler, 1000);
            isNextArticleIntervalActive = true;
        }
    }else {
        window.clearInterval(nextArticleInterval)
        nextArticleSeconds = 10;
        isNextArticleIntervalActive = false
        $nextArticleSeconds.innerText = nextArticleSeconds
    }

}); 


function nextArticleIntervalHandler(){
    if (nextArticleSeconds > 0){
        nextArticleSeconds--;
        $nextArticleSeconds.innerText = nextArticleSeconds
    }else {
        loadArticle(nextArticleIndex)
        window.scrollTo(0,0)
        nextArticleIndex = peekAnArticle()
        $nextArticleTitle.innerText = articles[nextArticleIndex].title + " ->"
    }

}


function draw( arcPercentage ) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var angle = Math.PI * 2 * arcPercentage;


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.arc(50, 50, 50, -90 * Math.PI / 180, angle -90 * Math.PI / 180);
        ctx.lineTo(50, 50);
        ctx.fillStyle = "red"
        ctx.fill();
    }
}

   const store=document.getElementById("content-id");
   const myinput= document.getElementById("myinput");
   const extraContent=document.getElementById("search");
   var globalvariable;
   let count =0;
   let max =0;
   var n=1;
   var arr=[];
   var searchletter;
   var includedTime;
   function random(x=5){
       globalvariable=x; 
       if(globalvariable===6){   
    if(n%2===0){
        console.log(n%2);
        globalvariable=0;
        
    }
    n++;
}
    if(searchletter!=undefined){
    extraContent.innerHTML='';
    // console.log(extraContent.innerHTML);
    // arr.length = 0;
    setTimeout(()=>{
        searchNews(searchletter);
    }
        , 2000);   
      
        
    }
 

   }
   const searchNews=async (searchText)=>{      
       searchletter=searchText;
       if(searchText!="undefined"){
      
    const response = await fetch("https://newsapi.org/v2/everything?q=Apple&from=2021-08-10&sortBy=popularity&apiKey=498b4450101d445bbba6f6d487cc695d");
    const datas = await response.json();
    const newdatas=datas.articles;
   
    const sortByDate = newdatas => {
        const sorter = (a, b) => {
          
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
       }
       newdatas.sort(sorter);

       newdatas.reverse();
        
    };
    sortByDate(newdatas);
    let matches= await newdatas.filter(data=>{
        const regex=new RegExp(`^${searchText}`,'gi');
        let { title, description } = data;     
if(globalvariable===6){  
    
    if (title) {
    const list=data.title.split(" ");
   
    var i=0;
    while(i<list.length){
       if(list[i].match(regex)!=null){
           count++;
       }
       i++
    }
    }
    if (description) {
    const list1=data.description.split(" ");
    var i=0;
    while(i<list1.length){
       if(list1[i].match(regex)!=null){
           count++;
       }
       i++
    }
}

    if(count===0){
        return;
    }
       if(count>max){
           
           max=count;
           count=0;
           arr.unshift(data);
           return data.title;
       }
       else if(count<max && count>0){
           arr.push(data);
           return data.title;
    
        count=0;
       }
    }

else{
    
  if (title) {
                const list=data.title.split(" ");
                for(let i=0;i<list.length;i++){
                   if(list[i].match(regex)!=null){
                      return data.title;
                   }
                }
            }
                 else if (description) {
                    const list1=data.title.split(" ");
                    for(let i=0;i<list1.length;i++){
                       if(list1[i].match(regex)!=null){
                 return data.description;
                 } 
               }
            } 
                else {
                  return;
                }

            }
        
    });                           
    
    if(searchText.length===0){
        matches=[];
        arr=[];
        extraContent.innerHTML='';
        // window.location.reload(false); 
        newsApi();
    }
    if(globalvariable===6){
    outputHtml(arr);
   
    }
    else{
        outputHtml(matches);
        
    }
}
   }
myinput.addEventListener("input",()=>searchNews(myinput.value));
   const outputHtml=(arr)=>{
       if(arr.length>0){
           
           const html=arr.map(a=>
            ` 
                <div class="card mb-2">
                <div class="news-api">
                <div class="news-api-content">
                     
                     <h6 class="my-2" style="margin-left:1em;">${a.title}</h6>
                    <p>
                        ${a.description}
                    </p>
                    
                    <p class="my-3">${new Date(a.publishedAt)}<p>

                    <a href="http://127.0.0.1:5500/index3.html" class="stretched-link"></a>
                </div>
                <div class="news-api-image">
                    <img width="100%" height="100%" src="${a.urlToImage}">
                </div>
            </div>
                </div>
            `

           ).join(" ")
           extraContent.innerHTML=html;
       }
    }
        async function newsApi() {
            const response = await fetch("https://newsapi.org/v2/everything?q=Apple&from=2021-08-10&sortBy=popularity&apiKey=498b4450101d445bbba6f6d487cc695d");
            const datas = await response.json();
            
            datas.articles.forEach((data)=>{ 
                const content=`
                <div class="news-api">
                    <div class="news-api-content">
                         
                         <h6 class="my-2" style="margin-left:1em;">${data.title}</h6>
                        <p>
                            ${data.description}
                        </p>
                        <p class="my-3">${data.publishedAt}<p>
                    </div>
                    <div class="news-api-image">
                        <img width="100%" height="100%" src="${data.urlToImage}">
                    </div>
                    
                    <div class="share-btn-container">
                        <a href="#" id="facebook-btn">
                            <i class="fab fa-facebook"></i>
                        </a>
                
                        <a href="#" id="twitter-btn">
                            <i class="fab fa-twitter"></i>
                        </a>
                
                        <a href="#" id="linkedin-btn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                
                        <a href="#" id="whatsapp-btn">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>                  
                </div>`               
                store.innerHTML+=content;
                 }) 
                }
        newsApi();
        function getSocialBtns() {
            const facebookBtn = document.querySelectorAll("#facebook-btn");
            const twitterBtn = document.querySelectorAll("#twitter-btn");
            const linkedinBtn = document.querySelectorAll("#linkedin-btn");
            const whatsappBtn = document.querySelectorAll("#whatsapp-btn");
          
            function init() {
              let postUrl = encodeURI(document.location.href);
              let postTitle = encodeURI("Hi everyone, please check this out: ");
          
              facebookBtn.forEach(btn => btn.setAttribute(
                "href",
                `https://www.facebook.com/sharer.php?u=${postUrl}`
              ));
          
              twitterBtn.forEach(btn => btn.setAttribute(
                "href",
                `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
              ));
              linkedinBtn.forEach(btn => btn.setAttribute(
                "href",
                `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
              ));
              whatsappBtn.forEach(btn => btn.setAttribute(
                "href",
                `https://wa.me/?text=${postTitle} ${postUrl}`
              ));
            }
            init();
          }
        
          setTimeout(getSocialBtns, 2000);
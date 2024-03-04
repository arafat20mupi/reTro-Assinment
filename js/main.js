const loadData = async () => {
    toggleLoading(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    displayData(posts)
};

const displayData = (data) => {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.textContent = '';
    data.forEach((post) => {
        const newDiv = document.createElement('div');
        newDiv.className = `flex `;
        newDiv.innerHTML = `
        <div  class="bg-gray-100 shadow-md flex gap-8 flex-1 py-10 px-3 rounded-xl mb-5 hover:bg-purple-400">
        <div class="indicator flex items-center text-center">
            <span class="indicator-item lg:top-20 top-28 badge ${post.isActive?"bg-green-500" : "bg-red-500"}"></span>
            <img src="${post.image}" alt="" class="w-20 rounded-full ">
        </div>
        <div class="w-full space-y-5">
            <div class="flex justify-between">
                <p># ${post.category}</p>
                <p>Author : ${post.author.name}</p>
            </div>
            <div class="text-start">
                <p class="postTitle text-xl font-bold text-[#12132D] mb-4">${post.title}</p>
                <p class="">${post.description}</p>
            </div>
            <hr>
            <div class="flex justify-between  text-center items-center">
                <div class="flex gap-6">
                    <p class=" fa-solid fa-comment">${post.comment_count}</p>
                    <p class=" fa-regular fa-eye">${post.view_count}</p>
                    <p class=" fa-regular fa-clock">${post.posted_time} min</p>
                </div>
                <div>
                    <button onclick="NewClick('${post.title}' , '${post.view_count}')"  class="postButton fa-regular fa-envelope hover:bg-slate-200 bg-slate-50 p-3 rounded-full text-[#63E6BE]"></button>
                </div>
            </div>
        </div>
    </div>
        `
        postsContainer.appendChild(newDiv);
    });
    setTimeout(() => {
        toggleLoading(false);
    }, 2000);
};


const NewClick = (title, view) => {
    const newDivContainer = document.getElementById('newDivContainer')
    const markCount = document.getElementById('mark-count');

    const div = document.createElement('div');
    div.className = 'mt-3 flex justify-between  text-start items-center bg-white p-8 rounded-lg';
    const p = document.createElement('p');
    p.className = 'text-xl font-bold text-[#12132D] '
    p.innerText = title;
    div.appendChild(p);
    const i = document.createElement('i');
    i.className = 'fa-solid fa-eye gap-3'
    i.innerText = view;
    div.appendChild(i);
    newDivContainer.appendChild(div);

    const currentValue = () => {
        let value = parseInt(markCount.innerText);
         value++;
         markCount.innerText = value;
        
    };
    currentValue();
};

const HandleSearch = () => {
    const searchField = document.getElementById('search-field').value;
    showSearchResult(searchField);
    toggleLoading(true);
}

const showSearchResult = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    displayData(data.posts);
};


const latest = async () => {
    toggleLoading2(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPost = document.getElementById('latestPost');
    data.forEach(post => {
        const newDiv = document.createElement('div');
        
        newDiv.innerHTML = `
        <div class="card lg:w-96 bg-base-100 hover:shadow-xl">
        <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
        <div class="card-body h-[270px]">
            <div>
                <i class="fa-solid fa-calendar-days"></i>
                <span>${post.author.posted_date?post.author.posted_date:'No publish date' }</span>
            </div>
          <h2 class="card-title">${post.title}</h2>
          <p>${post.description}</p>
          <div class="card-actions gap-4">
            <img class="w-11 h-11" src="${post.profile_image}" alt="">
            <div >
                <p>${post.author.name}</p>
                <p>${post.author.designation?post.author.designation:'Unknown' }</p>
            </div>
          </div>
        </div>
      </div>
        `
        latestPost.appendChild(newDiv)
    });
    setTimeout(() => {
        toggleLoading2(false);
    }, 2000)
};

const toggleLoading = (isLoading) =>{
    const loadingBars = document.getElementById('loading')
    
    if(isLoading){
        loadingBars.classList.remove('hidden')
    }
    else{
        loadingBars.classList.add('hidden')
    }
};

const toggleLoading2 = (isLoading) =>{
    const loadingBars = document.getElementById('loading2')
    console.log(loadingBars)
    if(isLoading){
        loadingBars.classList.remove('hidden')
    }
    else{
        loadingBars.classList.add('hidden')
    }
}




loadData();
latest();
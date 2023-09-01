// console.log('connected');
let isSorted = false; // to track my videos sorted state
let currentCategoryId = 0; // track current category id

const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    const categories = data.data; // this is my categories array
    const tabContainer = document.getElementById('tab-container'); // this is my empty tab container
    // tabContainer.textContent = '';
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadVideos('${category.category_id}')" class="tab btn px-6 normal-case">
            ${category.category}
        </a>
        `;
        tabContainer.appendChild(div);
    })
}

const handleLoadVideos = async categoryId => {
    if (categoryId !== currentCategoryId) {
        isSorted = false; // if a different category id is passed, then make it unsorted again
        currentCategoryId = categoryId;
    }

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${currentCategoryId}`);
    const data = await res.json();
    console.log(data.data);
    const videosArr = data.data; // this is my videos array

    const noContainer = document.getElementById('no-container'); // this is my card container for showing no content
    const cardContainer = document.getElementById('card-container'); // this is my empty cards container
    cardContainer.textContent = ''; // reload everytime for each category

    // sort method here
    if (isSorted) {
        videosArr.sort((a, b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1));
    }

    if (videosArr.length > 0) {
        noContainer.classList.add('hidden');
        // console.log(videosArr);
        videosArr?.forEach(video => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact bg-base-100 relative">
                <figure><img src="${video.thumbnail}" class="rounded-lg h-48 w-full" /></figure>
                <div class="absolute text-xs text-white text-center top-[165px] right-1">
                    ${video?.others?.posted_date ? `
                        <span class="bg-[#171717] py-1 px-2 rounded-md">
                            ${Math.floor((video.others.posted_date) / 3600)}hrs ${Math.floor((video.others.posted_date % 3600) / 60)}min ago
                        </span>`: ''}
                </div>
                <div class="card-body">
                    <div class="flex gap-3">
                        <div>
                            <div class="avatar">
                                <div class="w-10 rounded-full">
                                    <img src="${video.authors[0].profile_picture}" />
                                </div>
                            </div>
                        </div>
                        <div class="space-y-1">
                            <h2 class="text-lg font-bold">${video.title}</h2>
                            <p>${video.authors[0].profile_name} <img class="inline-block" src="${video?.authors[0]?.verified ? './images/verified.png' : ''}" /></p>
                            <p>${video.others.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
            cardContainer.appendChild(div);
        })
    } else {
        noContainer.classList.remove('hidden');
    }
}

const handleSort = () => {
    isSorted = !isSorted; // toggle sorted state: true/false
    // console.log('clicked sorted button');
    // console.log(isSorted);
    handleLoadVideos(currentCategoryId);
}

handleCategory();
handleLoadVideos('1000');
// console.log('connected');
const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    const categories = data.data; // this is my categories array
    const tabContainer = document.getElementById('tab-container'); // this is my empty tab container

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
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    console.log(data.data);
    const videosArr = data.data; // this is my videos array

    const noContainer = document.getElementById('no-container'); // this is my card container for showing no content
    const cardContainer = document.getElementById('card-container'); // this is my empty cards container
    cardContainer.textContent = ''; // reload everytime for each category

    if (videosArr.length > 0) {
        noContainer.classList.add('hidden');
        videosArr?.forEach(video => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact bg-base-100">
                <figure><img src="${video.thumbnail}" class="rounded-lg h-48 w-full" /></figure>
                <div class="badge badge-md bg-[#171717] border-0 text-white -mt-6">987,654</div>
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
                            <p>${video.authors[0].profile_name} <img class="inline-block" src="${video?.authors[0]?.verified?'./images/verified.png':''}" /></p>
                            <p>${video.others.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
            cardContainer.appendChild(div);
        })
    }else{
        noContainer.classList.remove('hidden');
    }
}

handleCategory();
handleLoadVideos('1000');
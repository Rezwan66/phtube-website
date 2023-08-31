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
        <a onclick="handleLoadVideos('${category.category_id}')" class="tab btn px-6 bg-[#FF1F3D] normal-case text-white hover:bg-red-400">
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

    const cardContainer = document.getElementById('card-container'); // this is my empty cards container
    cardContainer.textContent = ''; // reload everytime for each category

    videosArr?.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card card-compact bg-base-100">
                <figure><img src="./images/Icon.png" alt="Shoes" class="rounded-lg" /></figure>
                <div class="badge badge-md bg-[#171717] text-white -mt-4">987,654</div>
                <div class="card-body">
                    <div class="flex justify-center gap-2">
                        <div>
                            <figure><img src="./images/Icon.png" alt="Shoes" class="w-14 rounded-full" /></figure>
                        </div>
                        <div class="space-y-2">
                            <h2 class="text-base font-bold">If a dog chews shoes whose shoes does he choose?</h2>
                            <p>Shoes!</p>
                            <!-- svg here -->
                            <p>views</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    })
}

handleCategory();
handleLoadVideos('1000');
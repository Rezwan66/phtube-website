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
        <a class="tab btn px-6 bg-[#FF1F3D] normal-case text-white hover:bg-red-400">
            ${category.category}
        </a>
        `;
        tabContainer.appendChild(div);
    })
}

const handleLoadVideos = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
}

handleCategory();
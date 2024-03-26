import picturesData from './pictures.json';

class Pictures {
    constructor(
        public filename: string,
        public path: string,
        public alt: string,
        public category: string,
        public width: number,
        public height: number,
        public lazyload: boolean
    ) {}
}


function handleEvents() {
    const navContainer = document.getElementById('navContainer');
    navContainer?.addEventListener('click', (event) => {
        if(event.target instanceof HTMLLIElement) {
            const category = event.target.dataset.category;

            renderPicturesByCategory(category);
        }
    });
}

function renderPicturesByCategory(category: string | undefined): void {
    if (category) {
		const heading = document.createElement('h2');
		heading.innerText = category;
		const picContainer = document.getElementById('pictureContainer');
		
        const filteredPictures = picturesData.filter((picture: Pictures) => picture.category === category);
		
        clearPicContainer();
		
		picContainer?.appendChild(heading);
        renderPictureHtml(filteredPictures);
    }
}

function clearPicContainer(): void {
    const picContainer = document.getElementById('pictureContainer');
    if (picContainer)
    picContainer.innerHTML = '';
}

function renderPictureHtml(filteredPictures): void {
    const picContainer = document.getElementById('pictureContainer');

    filteredPictures.map((picture: Pictures) => {
       
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = picture.path;
        img.alt = picture.alt;
        img.width = picture.width;
        img.height = picture.height;
        img.loading = picture.lazyload ? 'lazy' : 'eager';

        const figcaption = document.createElement('figcaption');
        figcaption.innerText = picture.alt;

        figure.append(img, figcaption);
        picContainer?.appendChild(figure);
    })
}

handleEvents();
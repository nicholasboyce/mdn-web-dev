const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const picRoll = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = ['Closeup of a human eye', 'Rock that looks like a wave', 'Purple and white pansies', 'Section of wall from a pharoah', 'Large moth on a leaf'];

/* Looping through images */

for (let i = 0; i < picRoll.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${picRoll[i]}`);
    newImage.setAttribute('alt', altText[i]);
    thumbBar.appendChild(newImage);
}

thumbBar.addEventListener('click', (event) => {
    displayedImage.setAttribute('src', event.target.getAttribute('src'));
    displayedImage.setAttribute('alt', event.target.getAttribute('alt'));
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const state = btn.getAttribute('class');
    if (state === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
});
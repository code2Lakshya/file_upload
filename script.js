const input = document.querySelector('input');
let image_file;
const uploadImage = async () => {
    try {
        const form = new FormData();
        form.append('image_file', image_file);

        const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
            method: 'POST',
            headers: {
                'x-api-key': 'e765696bfe741b830f4798b4ba6ecbbef0b51f00fc7884c4262cce0f63d5c6c6f38a5b98b6634ab998ee38e8e3743281',
            },
            body: form,
        })
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: 'image/png' });
        const src = URL.createObjectURL(blob);
        const div = document.createElement('div');
        div.innerHTML = `
        <img src=${src} alt='image'>
        <a href=${src} download='download_image.png'>Download Image</a>
        `;
        div.classList.add('output-container');
        document.body.append(div);
        setTimeout(()=>{
            URL.revokeObjectURL(src);
        },5000)
    }
    catch (error) {
        console.error('Error:', error);
        alert('Network Error! Please Retry');
    };
}
input.addEventListener('change', (e) => {
    image_file = e.target.files[0];
})
document.querySelector('button').addEventListener('click', (e) => {
    if (image_file) {
        if(document.querySelector('.output-container')){
            document.querySelector('.output-container').remove();
        }
        uploadImage();
    }
    else{
        alert('Please Upload A file');
    }
})
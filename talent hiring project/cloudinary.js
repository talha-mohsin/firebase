const apiKey = '225279491945164';
const apiSecret = 'YKuoA3l57VXLCTwQkltJVeQufKw';
const cloudName = 'dmur7yayw';

const url = 'https://api.cloudinary.com/v1_1/dmur7yayw/image/upload';
    
export function uploadImg(formData) {

    console.log(formData, '=>> formdata');

    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            document.getElementById('data').innerHTML += data;
        })
        .catch(err => {
            console.log(err, '==>> error is happening!');
        })
}



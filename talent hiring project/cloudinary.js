const apiKey = '225279491945164';
const apiSecret = 'YKuoA3l57VXLCTwQkltJVeQufKw';
const cloudName = 'dmur7yayw';
const url = 'https://api.cloudinary.com/v1_1/dmur7yayw/image/upload';

export async function uploadImg(formData) {

    console.log(formData, '=>> formdata');

    try {
        let res = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        let data = await res.json()
        console.log(data.secure_url)
        return await data.secure_url;
    } catch (err) {
        console.log(err, '==>> error is happening here!');
    }

}
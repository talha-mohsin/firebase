
    
export function uploadImg(formData) {

    console.log(formData, '=>> formdata');

    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err, '==>> error is happening!');
        })
}



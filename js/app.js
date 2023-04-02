const URL = `https://nine-zenith-stocking.glitch.me/`

// post request
const post_user = async data =>{
    console.log(data)
   return await fetch(`${URL}/user`,{
        method: 'POST',
        headers: {

            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(data)
    })
}

// get request
const get_user = async () =>{

    const response =  await fetch(`${URL}user`)

    if(response.status !== 200) throw new Error('Cannot fetch the data')

    const data = await response.json()
    return data

}

// get_user()
//     .then(data => console.log(data))
//     .catch(err => console.log(err.message))
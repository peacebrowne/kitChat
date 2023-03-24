const URL = `http://localhost:5000/`

// post request
const post_user = async data =>{
    console.log(data)
   return await fetch(`${URL}user`,{
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

    return await fetch(`${URL}user`)

 }

 get_user()
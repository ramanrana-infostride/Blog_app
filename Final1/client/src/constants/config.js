// API NOTIFICATIONS AND MESSAGES

export const API_Notification_Messages = {
    loading:{
        title:"Loading",
        message:"Data is being loaded, Please Wait "
    },
    success:{
        title:"success",
        message:"Data successfully loaded"
    },
    responseFailure:{
        title:"Error",
        message:"An Error occurred while fetching response from the server.Please Try again Later "
    },
    requestFailure:{
        title:"Error",
        message:"An Error occurred while Parsing Error data "
    },
    netWorkError:{
        title:"Error",
        message:"Unable to Connect with the server"
    },
}


//API service URL

export const SERVICE_URLS ={
    userSignUp:{url:'/signup',method :'POST'}, 
    userLogin:{url:'/login',method:'POST'}
}
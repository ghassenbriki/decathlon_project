module.exports = {
  JWT_SECRET    : "70469e0d-200f-4834-8f35-4e94532eb7ea",
  JWT_EXPIRES_In: "7d", //7d 1h

  oauth: {
    google:{
      secret  : "xxxxxxxxxxxxxxxx.apps.googleusercontent.com",
      id      : "xxxxxxxxxxxxx"
    },
    fb:{
      id         : "1760104264132986",
      //secret     : process.env.FB_SECRET //MUST BE ON PROD MACHIN ENV TO BE HIDDEN !,
      secret     : "a932b8d78f3664e16d94d6adce8ce0d0",
      callback   : "http://localhost:8888/auth/facebook/callback" ,
    },
  },
}
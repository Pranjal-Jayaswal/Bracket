

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'mernSocial',
   
    google_client_id: "514125515455-cbp95jsjiu3s3qpjqmamm3fs87noqstj.apps.googleusercontent.com",
    google_client_secret: "m_nvsY6DtBaEaJQMI8MiWhqj",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'mernSocial',
}


const production =  {
    name: 'production',
    asset_path: 'process.env.mernSocial_ASSET_PATH',
    session_cookie_key: 'blahsomething',
    db: 'mernSocial',
   
    google_client_id: "514125515455-cbp95jsjiu3s3qpjqmamm3fs87noqstj.apps.googleusercontent.com",
    google_client_secret: "m_nvsY6DtBaEaJQMI8MiWhqj",
    google_call_back_url: "http://mernSocial.com/users/auth/google/callback",
    jwt_secret: 'mernSocial',
}


// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
module.exports = eval();
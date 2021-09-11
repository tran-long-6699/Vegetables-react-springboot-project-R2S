export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=936587726373-friqii83r96m700i1cg8vm167quiln40.apps.googleusercontent.com&scope=email%20profile&state=17H-HCpW42Oz14Zj0Q7-3UI9PxgoKT_wnvnA9qqNPqI%3D&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fgoogle&flowName=GeneralOAuthFlow';
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

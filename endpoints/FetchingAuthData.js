import { fetchAuthSession } from 'aws-amplify/auth';
export const FetchingAuthData = async () => {

    const session = await fetchAuthSession({ forceRefresh: true });

    const accessToken = session.tokens.accessToken.toString();
   
    return accessToken


}
import 'react-native-url-polyfill/auto'
import { Account,Avatars,Client,ID,Databases,Query,Storage } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.devx.aora',
    projectId: '66faf6050035d9149690',
    databaseId: '66faf78b0030e6d8232c',
    userCollectionId: '66faf7c9002ea2273d20',
    videoCollectionId: '66faf805001fe6966df9',
    storageId: '66fafaaf003da7584f6f'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email,password,username) => {
    // Register User
    // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    //     .then(function (response) {
    //         console.log(response);
    //     }, function (error) {
    //         console.log(error);
    //     });
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw new Error(error)

        const avatarUrl = avatars.getInitials(username)
        await signIn(email,password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser

    } catch (error) {
        console.log(error,'ABC');
        throw new Error(error)
    }
}

export async function checkSession() {
    try {
      const currentSession = await account.getSession('current');
      return currentSession;  // If a session exists, return it
    } catch (error) {
      return null;  // No session is active
    }
}

export async function signIn(email,password){
    try {
        const tempsession = await checkSession();
        if(tempsession){
            return tempsession;
        }
        const session = await account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        console.log(error,'DEF')
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountid',currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]  // Perform full-text search on 'title'
        );
        
        return posts.documents;  // Return the search results
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw new Error("Search failed. Please try again.");
    }
};

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [
                Query.equal('creator', userId),
                Query.orderDesc('$createdAt')
            ],  // Perform full-text search on 'title'
        );
        
        return posts.documents;  // Return the search results
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw new Error("Search failed. Please try again.");
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId,type) => {
    let fileUrl;

    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(storageId,fileId);
        }
        else if(type === 'image'){
            fileUrl = storage.getFileView(storageId,fileId,2000,2000,'top',100)
        }
        else{
            throw new Error('Invalid file type!')
        }

        if(!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const uploadFile = async (file,type) => {
    if(!file) return

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id,type);

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl,videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,'image'),
            uploadFile(form.video,'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId,videoCollectionId,ID.unique(),{
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}
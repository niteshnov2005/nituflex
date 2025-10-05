import { Client, Databases, ID, Query } from "appwrite";

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(endpoint) // Your Appwrite API endpoint
  .setProject(projectId); // Your project ID

// Export client & services
const databases = new Databases(client);

export const updateMovieCount = async (query: string,movie:Movie) => {
    try{
    const result= await databases.listDocuments(databaseId, tableId, [Query.equal('searchTerm',query)]);
    if(result.documents.length > 0){
        const documentId = result.documents[0];
        await databases.updateDocument(databaseId, tableId, documentId.$id, {
            count: documentId.count + 1,
        });
    } else {
        await databases.createDocument(databaseId, tableId, ID.unique(), {
            searchTerm: query,
            count: 1,
            movies_id: movie.id,
            title: movie.title,
            poster_url: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,

        });
    }
} catch (error) {
    console.error('Error updating movie count:', error);   
    throw error; 
}
};

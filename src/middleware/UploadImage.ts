import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// const uploadImage = async (file: File) => {
//     try{
//         console.log("Cloud Name:", process.env.CLOUD_NAME);
//         console.log("API Key:", process.env.CLODINARY_API_KEY ? "Loaded" : "Missing");
//         console.log("API Secret:", process.env.CLODINARY_API_SECRET_KEY ? "Loaded" : "Missing");
//         if (!file) {
//             throw new Error("No file provided");
//         }

//         const buffer = file.buffer || Buffer.from(await file.arrayBuffer());

//         return new Promise((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 { folder: "Event-management-web" },
//                 (error, uploadResult) => {
//                     if (error) {
//                         reject(new Error(`Cloudinary Upload Failed: ${error.message}`));
//                     } else {
//                         resolve(uploadResult);
//                     }
//                 }
//             );

//             uploadStream.end(buffer); // Ensure buffer exists before calling .end()
//         });
//     }catch (error) {
//         console.error("Error uploading image to Cloudinary", error);
//         throw new Error("Image upload failed");
//     }
// }

export const uploadImageToCloudinary = async (file: File): Promise<any> => {
    try {
        const result = await uploadImage(file);
        console.log("Image uploaded successfully:", result);
        return result;
    } catch (error) {
        console.error("Failed to upload image:", error);
        throw error;
    }
};



const uploadImage = async (file: File): Promise<any> => {
    try {
        console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
        console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing");
        console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

        if (!file) {
            throw new Error("No file provided");
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { folder: "Event-management-web" },
                (error, uploadResult) => {
                    if (error) {
                        reject(new Error(`Cloudinary Upload Failed: ${error.message}`));
                    } else {
                        resolve(uploadResult);
                    }
                }
            );

            uploadStream.end(buffer);
        });
    } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        throw new Error("Image upload failed");
    }
};

export default cloudinary;


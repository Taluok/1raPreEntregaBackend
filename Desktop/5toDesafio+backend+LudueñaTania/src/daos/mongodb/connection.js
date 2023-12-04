import mongoose from "mongoose";

export const connectionURL = 'mongodb+srv://tanialuduenaok:2023Proyect@taluok.crhrslr.mongodb.net/?retryWrites=true&w=majority';


try {
    await mongoose.connect(connectionURL);
    console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
    console.log(`ERROR => ${error}`);
}
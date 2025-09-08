import supabase, { supabaseUrl } from "./supabase"
export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error("Cabins Could Not Be Founded")
    }
    return data
}

export async function deletecabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be deleted")
    }
    return data;
}


export async function createEditCabin(newCabin, id) {
    const hasImagePath=newCabin.image?.startsWith?.(supabaseUrl);
    
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    let imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
    let query = supabase.from('cabins');
    //1.create cabin 
    if (!id)
       query= query.insert([{ ...newCabin, image: imagePath }])
        console.log(newCabin)

    // B) For Edit
    if (id)
       query= query.update({ ...newCabin,image:imagePath }).eq("id", id)
        const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("cabin could not be created")
    }
    if(hasImagePath) return data;
    //2.Upload Image
    const { error: storageError } = await supabase
        .storage
        .from('cabins-images')
        .upload(imageName, newCabin.image)
    //3.Delete cabin if there is an error

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(storageError);
        throw new Error("cabine image could not be uploaded and cabin was not created")
    }


    return data;

}
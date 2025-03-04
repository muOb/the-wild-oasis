import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("error to fetch data");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.create/Edit cabin
  let query = supabase.from("cabins");

  //A)Create
  if (!id)
    //.insert([newCabin]) this work bcz the information in form in the component CreateCabinForm in register the same in supabase cabin table
    query = query.insert([{ ...newCabin, image: imagePath }]);
  //B)Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //2.Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

//** alternative way of setting up the insert in the scenario where the information is not exactly the same in supabase**
// export async function createCabin(newCabin) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([
//       {
//         name: newCabin.name,
//         maxCapacity: newCabin.maxCapacity,
//         regularPrice: newCabin.regularPrice,
//         discount: newCabin.discount,
//         description: newCabin.description,
//         image: newCabin.image,
//       },
//     ])
//     .select();
//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be created");
//   }

//   return data;
// }
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted!");
  }
  return data;
}

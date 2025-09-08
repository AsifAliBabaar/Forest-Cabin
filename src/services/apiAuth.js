import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  console.log(email, password, fullName)
  const { data, error } = await supabase.auth.signUp({
    email, password, options: {
      data: {
        fullName,
        avatar: ""
      }
    }
  });
  if (error) throw new Error(error.message);
  return data;

}
export async function login({ email, password }) {
  console.log(email,password)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  console.log(data, error)
  if (error) throw new Error(error.message)
  return { data }

}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data } = await supabase.auth.getUser();

  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message)
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1.UpdateUser password or fullName
  let UpdateData;
  if (password) UpdateData = { password }
  if (fullName) UpdateData = { data: { fullName } };

  const { data, errors } = await supabase.auth.updateUser(UpdateData);

  if (errors) throw new Error("error.message");

  if (!avatar) return data;
  //2.Upload The Avatar image.com
  const fileName = `avatar-${data.user.id}-${Math.random()}`
  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message)
  //3.Update avatar in the user
  const { data: updateUser, error: error2 } =await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }
  });
  if(error2) throw new Error(error2.message);
  return updateUser;


}
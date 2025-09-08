import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient=useQueryClient();
  const {register,handleSubmit,reset,getValues,formState}=useForm();
  const {errors}=formState;
  const {mutate,isLoading:isCreating}=useMutation({
    mutationFn:createCabin,
    onSuccess:()=>{toast.success("new cabin successfully created")
    queryClient.invalidateQueries({querykey:["cabins"]});
    reset();
  },
  onError:()=>toast.error("Cabins could Not Be Created")
  });
  function onSubmit(data){
     mutate({...data , image:data.image[0]});
  }
  function onError(errors){
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="cabin name" disabled={isCreating} errors={errors?.name?.message}>
      <Input type="text" disabled={isCreating} id="name" {...register("name",{required:"this field is required"})} />
      </FormRow>
      <FormRow label="Maximum capacity" disabled={isCreating} errors={errors.maxCapacity?.message}>
        <Input type="number" disabled={isCreating} id="maxCapacity" {...register("maxCapacity",{required:"this field is required",min:{value:1,message:"Capacity should be at least One"}})} />
      </FormRow>

      <FormRow label="Regular price" disabled={isCreating} errors={errors.regularPrice?.message}>
        <Input type="number" disabled={isCreating} id="regularPrice" {...register("regularPrice",{required:"this field is required"})} />
      </FormRow>

      <FormRow label="Discount" disabled={isCreating} errors={errors?.discount?.message}>
        <Input type="number" disabled={isCreating} id="discount" defaultValue={0} {...register("discount",{required:"this field is required",validate:{value: (value)=> value <= getValues().regularPrice ||"Discount should be less than the regular price"}})} />
      </FormRow>

      <FormRow label="Description for website" disabled={isCreating} errors={errors?.description?.message}>
        <Textarea type="text" disabled={isCreating} id="description"  defaultValue="" {...register("description",{required:"this field is required"})}/>
      </FormRow>

      <FormRow label="Cabin photo" disabled={isCreating}>
        <FileInput id="image"  accept="image/*" disabled={isCreating} {...register("image",{required:"this field is required"})}  />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

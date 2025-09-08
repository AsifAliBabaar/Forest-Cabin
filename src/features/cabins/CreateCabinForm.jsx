import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editvalues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // Creating
  const { isCreating, createCabin } = useCreateCabin();

  // Editing
  const { EditCabin, isEditing } = useEditCabin();

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editvalues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      EditCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: () => { reset(); onCloseModal?.(); } }
      );
    else
      createCabin(
        { ...data, image },
        { onSuccess: () => { reset(); onCloseModal?.(); } }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label="cabin name"
        disabled={isWorking}
        errors={errors?.name?.message}
      >
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        disabled={isWorking}
        errors={errors.maxCapacity?.message}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "Capacity should be at least One" },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        disabled={isWorking}
        errors={errors.regularPrice?.message}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        disabled={isWorking}
        errors={errors?.discount?.message}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: {
              value: (value) =>
                value <= getValues().regularPrice ||
                "Discount should be less than the regular price",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        disabled={isWorking}
        errors={errors?.description?.message}
      >
        <Textarea
          type="text"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" disabled={isWorking}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          onClick={() => onCloseModal?.()}
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

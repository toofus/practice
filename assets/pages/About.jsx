import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

const About = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const appendItem = () => {
    append({ name: "", phone: "" });
  };

  const onSubmit = async (data) => {};

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {fields.map(({ id }, index) => {
          {
            return (
              <div
                className="flex items-center space-x-3 border rounded-lg p-2"
                key={id}
              >
                <div>{index + 1}</div>
                <div>
                  <input
                    {...register(`items[${index}].name`, {
                      required: "Name is required",
                    })}
                  />
                  <p className="text-sm text-red-600">
                    {errors.items?.[index]?.name?.message}
                  </p>
                </div>
                <div>
                  <input
                    {...register(`items[${index}].phone`, {
                      required: "Phone is required",
                    })}
                  />
                  <p className="text-sm text-red-600">
                    {errors.items?.[index]?.phone?.message}
                  </p>
                </div>
                <div>
                  <button type="button" onClick={() => remove(id)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          }
        })}
        <button type="button" onClick={() => append({})}>
          Append
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default About;

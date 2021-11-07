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
    append({ name: "", phone: "", upload: null });
  };

  const onSubmit = ({ items }) => {
    const formData = new FormData();
    for (let i = items.length - 1; i >= 0; i--) {
      formData.set(`form[${i}][name]`, items[i].name);
      formData.set(`form[${i}][phone]`, items[i].phone);
      formData.set(`form[${i}][upload]`, items[i].upload[0]);
    }
    fetch("https://localhost:8000/post-data", {
      method: "post",
      cache: "no-cache",
      credentials: "same-origin",
      body: formData,
    })
      .then((response) => response.json())
      .then(({ success, data }) => {
        if (success) {
          console.log("ok", data);
        } else {
          data.violations.forEach((violation, index) => {
            // const name = propertyPath.replace("[", "").replace("]", "");
            violation.forEach((obj) => {
              const name = `items[${index}].${obj.propertyPath}`;
              setError(name, {
                type: "manual",
                name: name,
                message: obj.message,
              });
            });
          });
        }
      })
      .catch((error) => console.log(error));
  };

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
                  <input
                    type="file"
                    {...register(`items[${index}].upload`, {
                      required: "upload is required",
                    })}
                  />
                  <p className="text-sm text-red-600">
                    {errors.items?.[index]?.upload?.message}
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
        <button type="button" onClick={() => appendItem()}>
          Append
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default About;

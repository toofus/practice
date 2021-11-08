import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm();
  const { fields, append, insert, remove } = useFieldArray({
    keyName: "key",
    control,
    name: "items",
  });

  const appendItem = () => {
    append({ id: "", name: "", phone: "", upload: null });
  };

  useEffect(() => {
    fetch("https://localhost:8000/get-data")
      .then((response) => response.json())
      .then(({ data }) => {
        Object.entries(data).forEach((item) => {
          console.log(item);
          insert(item[0], {
            id: item[1].id,
            name: item[1].name,
            phone: item[1].phone,
            upload: null,
          });
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = ({ items }) => {
    setLoading(true);
    const formData = new FormData();
    for (let i = items.length - 1; i >= 0; i--) {
      formData.set(`form[${i}][name]`, items[i].name);
      formData.set(`form[${i}][phone]`, items[i].phone);
      formData.set(`form[${i}][id]`, i);
      if (items[i].upload && items[i].upload.length) {
        formData.set(`form[${i}][upload]`, items[i].upload[0]);
      } else {
        formData.set(`form[${i}][upload]`, null);
      }
    }
    fetch("https://localhost:8000/post-data", {
      method: "post",
      cache: "no-cache",
      credentials: "same-origin",
      body: formData,
    })
      .then((response) => response.json())
      .then(({ success, data }) => {
        setLoading(false);
        if (success) {
          navigate("/");
        } else {
          // console.log(data.violations);
          const violations = Object.entries(data.violations);
          violations.forEach((violation) => {
            violation[1].forEach((obj) => {
              const propertyPath = `items[${violation[0]}].${obj.propertyPath}`;
              setError(propertyPath, {
                type: "manual",
                name: propertyPath,
                message: obj.message,
              });
            });
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {fields.map(({ key }, index) => {
          {
            return (
              <div
                className="flex items-center space-x-3 border rounded-lg p-2"
                key={key}
              >
                <input type="hidden" {...register(`items[${index}].id`)} />
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
                  <input type="file" {...register(`items[${index}].upload`)} />
                  <p className="text-sm text-red-600">
                    {errors.items?.[index]?.upload?.message}
                  </p>
                </div>
                <div>
                  <button type="button" onClick={() => remove(index)}>
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
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default About;

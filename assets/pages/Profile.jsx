import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ApplicationContext } from "@/contexts/ApplicationContext";

const Profile = () => {
  const [data, setData] = useState({
    identifier: "",
    new_password: "",
    current_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(true);
  const { appEnv } = useContext(ApplicationContext);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`${appEnv.baseUrl}/get-profile`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reset(data);
  }, [data]);

  const onSubmit = (params) => {};

  return (
    <div>
      <h1 className="text-xl text-red-900">Profile</h1>
      {!loading && data && (
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Identifier</label>
            <input
              {...register("identifier", {
                required: "identifier is required",
              })}
            />
            {errors.identifier && <p>{errors.identifier.message}</p>}
          </div>
          <div>
            <label>current_password</label>
            <input
              {...register("current_password", {
                required: "current_password is required",
              })}
            />
            {errors.current_password && (
              <p>{errors.current_password.message}</p>
            )}
          </div>
          <div>
            <label>new_password</label>
            <input
              {...register("new_password", {
                required: "new_password is required",
              })}
            />
            {errors.new_password && <p>{errors.new_password.message}</p>}
          </div>
          <div>
            <label>confirm_password</label>
            <input
              {...register("confirm_password", {
                required: "confirm_password is required",
              })}
            />
            {errors.confirm_password && (
              <p>{errors.confirm_password.message}</p>
            )}
          </div>
          <div className="mt-10">
            <button type="submit" className="btn btn-primary mr-1">
              Submit
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;

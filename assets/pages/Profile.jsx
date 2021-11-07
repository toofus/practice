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
  const { register, handleSubmit, reset } = useForm();

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

  const onSubmit = (params) => {
    return false;
  };

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
            <input name="identifier" {...register("identifier")} />
          </div>
          <div>
            <label>current_password</label>
            <input name="current_password" {...register("current_password")} />
          </div>
          <div>
            <label>new_password</label>
            <input name="new_password" {...register("new_password")} />
          </div>
          <div>
            <label>confirm_password</label>
            <input name="confirm_password" {...register("confirm_password")} />
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

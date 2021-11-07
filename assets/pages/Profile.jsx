import React, { useEffect, useState, useContext } from "react";
import { ApplicationContext } from "@/contexts/ApplicationContext";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { appEnv } = useContext(ApplicationContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${appEnv.baseUrl}/get-profile`)
      .then((response) => response.json())
      .then((result) => setData(result.success))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl text-red-900">Profile</h1>
      <div className="mt-5">
        {loading && 'loading'}
      </div>
      <div className="mt-5">
        {data && <p>{data}</p>}
      </div>
    </div>
  );
};

export default Profile;

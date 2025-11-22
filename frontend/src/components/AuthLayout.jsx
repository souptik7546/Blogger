import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    setLoader(true)
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authentication !== authStatus) {
      navigate("/");
    }
    setLoader(false)
  }, [authStatus, navigate, authentication]);

  return loader ? <div>Loading...</div>: <>{children}</>
}

export default Protected;

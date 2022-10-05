import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";

const Outbox = () => {
  const [email, setEmail] = useState({});
  const CleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-121cf-default-rtdb.firebaseio.com/${CleanUserEmail}sentemail.json`
    )
    .then((res) => res.json())
    .then((data) => {
      setEmail(data);
    });
}, [CleanUserEmail]);



  return(
    <div>
      <h4>This is outbox</h4>
    </div>
  );
};

export default Outbox;
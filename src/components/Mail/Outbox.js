import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";

const Outbox = () => {
  const [email, setEmail] = useState({});
  const CleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mail-box-7607c-default-rtdb.firebaseio.com/${CleanUserEmail}sentemails.json`
    )
    .then((res) => res.json())
    .then((data) => {
      setEmail(data);
      console.log(data,'data');
    });
}, [CleanUserEmail]);

console.log(email, 'email');
const emailList = email ? (
<ul>
  {Object.keys(email).map((item) => (
    <p>
      <label style={{ textAlign: "left"}}>To: {email[item].to}</label>
      <hr/>
      <label>Heading: {email[item].heading}</label>
      <hr/>     
      <p>{email[item].body.replace(/<[^>]*>/g, "")}</p>
    </p>
  ))}
</ul>
) : (
  <p>No Email Found</p>
);

  return(
    <div>
      <h4>This is outbox</h4>
      {emailList}
    </div>
  );
};

export default Outbox;
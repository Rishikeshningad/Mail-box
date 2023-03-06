import React, {Fragment, useEffect, useState} from "react";
import SingleMail from "./SingleMail";

const Outbox = (props) => {
  const [email, setEmail] = useState({});
  const [singleMail, setSingleMail] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(
      `https://mail-box-ef6ae-default-rtdb.firebaseio.com/sentemails.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then((data) => {
      setEmail(data);
      console.log(data,'data');
    });
}, [show]);

const openEmailClickHandler = (e) => {
  setSingleMail({
      email: email[e.currentTarget.id],
      ID: e.currentTarget.id,
  });
};

console.log(email, 'email');

const emailList = email ? (
<ul style={{ marginTop: "20px"}}>
  {Object.keys(email).map((item)=> {
    console.log(email[item].isRead);

    return (
      <li
      id={item}
      onClick={openEmailClickHandler}
      style={{
        border: "1px solid black",
        textAlign: "left",
        marginTop: "14px",
        borderRadius: "5px",
      }}
      key={item}  
      >
        <div
        style={{
          paddingRight: "10px",
        }}
        >
          <span
          style={{
            fontWeight: "bold",
          }}
          >
            To:
          </span>
          <span>{email[item].to}</span>
        </div>
        <br/>
        <div>
          <span
          style={{
            fontWeight: "bold",
          }}
          >
            Subject:
          </span>
          <span>{email[item].heading}</span>
        </div>
        <br/>
        <div>
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "1000px",
          }}
          >
            <div>
              <span
              style={{
                fontWeight: "bold",
              }}
              >
                Msg:
              </span>
              <span>
                {email[item].body.replace(/<[^>]*>/g,"")}
              </span>
            </div>
          </div>
        </div>
        <br/>
      </li>
    );
  })}
</ul>
) : (
  <p>No Email Found
    <button onClick={() => onSingleMailBackHandler()}>Back</button>
  </p>
);

 const onSingleMailBackHandler = () => {
  setSingleMail("");
  setShow(true);
 };

 const onSingleMailDeleteHandler = (data) => {
  setEmail(data);
  setSingleMail("");
 };

 console.log(singleMail);

  return(
    <Fragment>
      {!singleMail && emailList}
      {singleMail && (
        <>
        <SingleMail
          onClose={onSingleMailBackHandler}
          onDelete={onSingleMailDeleteHandler}
          data={singleMail}
           setShow={setShow}
        />
      </>
      )}
    </Fragment>
  );
};

export default Outbox;
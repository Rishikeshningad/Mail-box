import React, { Fragment, useEffect, useState } from "react";
import SingleMail from "./SingleMail";

const Inbox = (props) => {
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
                console.log(data, "......inboxdata");
              });
          }, [show]);
        
          //Unread msg
          useEffect(() => {
            let arr = [];
            for (let key in email) {
              if (email[key].isRead === true) {
                arr.push(email[key].isRead);
              }
            }
            props.setIsCount(arr.length);
          }, [email, show]);
          console.log(show);
          const openEmailClickHandler = (e) => {
            setSingleMail({
              email: email[e.currentTarget.id],
              ID: e.currentTarget.id,
            });
          
          };
        
          console.log(email);
          const emailList = email ? (
            <ul style={{ marginTop: "20px" }}>
              {Object.keys(email).map((item) => {
                console.log(email[item].isRead);
                return (
                  <li
                    id={item}
                    onClick={openEmailClickHandler}
                    style={{
                      width: "80%",
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
                    <br />
                    <div>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Subject:
                      </span>
                      <span> {email[item].heading}</span>
                    </div>
                    <br />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "90%",
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
                          <span style={{}}>
                            {" "}
                            {email[item].body.replace(/<[^>]*>/g, "")}
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: email
                              ? email[item]
                                ? email[item].isRead
                                  ? "blue"
                                  : "white"
                                : ""
                              : "",
                            height: "10px",
                            width: "10px",
                            marginTop: "7px",
                            border: "1px solid black",
                          }}
                        ></div>
                      </div>
                    </div>
                    <br />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
             No Emails Found
            <button onClick={() => onSingleMailBackHandler()}>Back</button>  
            </p>
              );
    
    const onSingleMailBackHandler = () => {
      setShow(true);
      setSingleMail("");
    };
            
    const onSingleMailDeleteHandler = (data) => {
     setEmail(data);
     setSingleMail('');
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

export default Inbox;
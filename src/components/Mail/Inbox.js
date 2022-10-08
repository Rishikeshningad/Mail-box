import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleMail from "./SingleMail";

const Inbox = (props) => {
    const [email, setEmail] = useState({});
    const [singleMail, setSingleMail] = useState("");
    const [isRead, setIsRead] = useState(false);
    const [show, setShow] = useState(false);

     const CleanUserEmail = useSelector((state) => state.auth.cleanEmail);
    
        useEffect(() => {
            fetch(
              `https://mail-box-7607c-default-rtdb.firebaseio.com/sentemails.json`,
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
            setIsRead(true);
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
                        From:
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
                            <p>No Emails Found</p>
                        );
    const onSingleMailCloseHandler = () => {
                setShow(true);
                setSingleMail("");
            }            

    return(
        <Fragment>
         <h3>This is Inbox</h3>
         {!singleMail && emailList}
        
        {singleMail && (
            <>
            <SingleMail
            onClose={onSingleMailCloseHandler}
            data={singleMail}
            setShow={setShow}
            />
            </>
        )}
        </Fragment>
    );
};

export default Inbox;
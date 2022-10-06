import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SingleMail from "./SingleMail";

const Inbox = (props) => {
    const [email, setEmail] = useState({});
    const [singleMail, setSingleMail] = useState("");
    const [show, setShow] = useState(false);

     const CleanUserEmail = useSelector((state) => state.auth.cleanEmail);
    useEffect(() => {
        fetch(
            `https://mail-box-7607c-default-rtdb.firebaseio.com/${CleanUserEmail}sentemails.json`,
            {
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setEmail(data);
                console.log(data,"..inboxdata")
            });
    }, [CleanUserEmail]);

    const openEmailClickHandler = (e) => {
        setSingleMail({email:email[e.currentTarget.id],ID:e.currentTarget.id});
        setShow(true);
    }

    const emailList = email ? (
        <ul>
            {Object.keys(email).map((item) => (
                <li
                id={item}
                onClick={openEmailClickHandler}
                style={{
                    border:"2px solid black",
                    textAlign:"left",
                    listStyle:email[item].isRead ? 'none':'',
                }}
                key={item}>
                    <span style={{ paddingRight: "10px", textAlign: "left"}}>
                        From: {email[item].from}
                    </span>
                    <span>Heading: {email[item].heading}</span>
                </li>
            ))}
        </ul>
    ) : (
        <p>No Emails Found</p>
    );

    const onSingleMailCloseHandler = () => {
      setSingleMail('');
    };

    const onSingleMailDeleteHandler = (data) => {
setEmail(data);
    };

    return(
        <Fragment>
         <h3>This is Inbox</h3>
         {!singleMail && emailList}
         {singleMail && <SingleMail onClose={onSingleMailCloseHandler} data={singleMail} />}
         {singleMail && <SingleMail onDelete={onSingleMailDeleteHandler}
           onClose={onSingleMailCloseHandler}
           data={singleMail}
         />}
        </Fragment>
    );
};

export default Inbox;
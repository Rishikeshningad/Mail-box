import React, { useState } from "react";
import Compose from "../Mail/Compose";
import Inbox from "../Mail/Inbox";
import Outbox from "../Mail/Outbox";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const [createMail, setCreateMail] = useState(false);
  const [inbox, setInbox] = useState(true);
  const [outbox, setOutbox] = useState(false);
  const [count, setCount] = useState(0);

  const mailHandler = () => {
    setCreateMail(true);
    setInbox(false);
    setOutbox(false);
  };

  const inboxHandler = () => {
    setInbox(true);
    setCreateMail(false);
    setOutbox(false);
  };

  const outboxHandler = () => {
    setOutbox(true);
    setInbox(false);
    setCreateMail(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'sans-serif', marginLeft:'20px'}}>Welcome to Mail Box</h1>
      <div className={classes.sideNav}>
        <button onClick={mailHandler} className={classes.btn}>Compose</button>
        <br/>
        <button onClick={inboxHandler} className={classes.btn1}>Inbox
        <span>unread:{count}</span>
        </button>
        <br/>
        <button onClick={outboxHandler} className={classes.btn1}>Outbox</button>
      </div>
      <div className={classes.mailBox}>
        {createMail && <Compose />}
        {inbox && <Inbox setIsCount={setCount}/>}
        {outbox && <Outbox />}
      </div>
    </div>
  );
};

export default Welcome;

import React, { useState } from "react";
import Compose from "../Mail/Compose";
import Inbox from "../Mail/Inbox";
import Outbox from "../Mail/Outbox";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const [createMail, setCreateMail] = useState(false);
  const [inbox, setInbox] = useState(true);
  const [outbox, setOutbox] = useState(false);

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
      <h1 className={classes.wel}>Welcome to Mail Box</h1>
      <div className={classes.sideNav}>
        <button onClick={mailHandler} className={classes.btn}>Create Email</button>
        <br/>
        <button onClick={inboxHandler} className={classes.btn1}>Inbox</button>
        <br/>
        <button onClick={outboxHandler} className={classes.btn1}>Outbox</button>
      </div>
      <div className={classes.mailBox}>
        {createMail && <Compose />}
        {inbox && <div>Inbox</div>}
        {inbox && <Inbox/>}
        {outbox && <Outbox />}
      </div>
    </div>
  );
};

export default Welcome;

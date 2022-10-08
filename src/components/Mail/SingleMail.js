import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SingleMail = (props) => {
    const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
    console.log(cleanUserEmail);
    console.log(props.data.email.isRead);
    
    const endPoint = props.data.ID;
    console.log(endPoint, '..endPoint');

    useEffect(() => {
        const body1 = props.data.email.body.replace(/<[^>]*>/g,"")
        fetch(`https://mail-box-7607c-default-rtdb.firebaseio.com/sentemails/${endPoint}.json`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                from: props.data.email.from,
                to: props.data.email.to,
                heading: props.data.email.heading,
                body: body1,
                isRead: false,
                id:props.data.email.id
            }),
        }
    )
    .then((res) => {
        console.log(res,"..res");
        return res.json();
    })
    .then((data) => {
       console.log(data);
       return props.setBlue(props.data.email.id);
    });
}, []); 
console.log(props.data.email.body.replace(/<[^>]*>/g, ""));
  const msg = props.data.email.body.replace(/<[^>]*>/g, "");
            

    return (
   <div>
    <button style={{ aligntext: "right"}} onClick={props.onClose}>Back</button>
    <div>
        <span>From:</span>
        <span>
            <b>{props.data.email.to}</b>
        </span>
    </div>
    <hr/>
    <span>Subject:</span>
    <h3>{props.data.email.heading}</h3>
    <hr/>
   <p>{msg}</p>
   </div>
    );
};

export default SingleMail;
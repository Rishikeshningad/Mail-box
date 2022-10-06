import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SingleMail = (props) => {
    const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
    const endPoint = props.data.ID;

    useEffect(() => {
        fetch(`https://mail-box-7607c-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox/${endPoint}.json`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                isRead:true,
            })
            .then((res) => {
                console.log(res,"..res")
            }).then((data) => {
                console.log(data,'..singleData')
            })
        })
    }, [cleanUserEmail,endPoint])

    return (
   <div>
    <button>Close</button>
    <h3>{props.data.email.from}</h3>
    <hr/>
    <h3>{props.data.email.heading}</h3>
    <hr/>
    <div dangerouslySetInnerHTML={{ __html: props.email.body}}/>
   </div>
    );
};

export default SingleMail;
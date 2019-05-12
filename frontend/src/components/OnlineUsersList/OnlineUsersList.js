import React, {Fragment} from 'react';

const OnlineUsersList = props => {
    return (
        <Fragment>
            <h5>Online users</h5>
            <div className="box p-3">
                <ul className="m-0">
                    {props.onlineUsers.map((user, i) => (
                        <li key={i}>{user}</li>
                    ))}
                </ul>
            </div>
        </Fragment>

    );
};

export default OnlineUsersList;

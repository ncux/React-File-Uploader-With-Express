import React from 'react';

function Message(props) {

    return (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
            { props.message }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Message;
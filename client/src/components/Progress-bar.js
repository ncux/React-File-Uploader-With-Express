import React from 'react';

function Progress(props) {

    return (
        <div className="alert alert-info alert-dismissible fade show" role="alert">

            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${props.uploadProgress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    { props.uploadProgress }%
                </div>
            </div>

        </div>
    )
}

export default Progress;
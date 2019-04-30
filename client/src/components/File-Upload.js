import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from "./Progress-bar";

import axios from 'axios';


function FileUploader() {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Select file');  // sets the input label only
    const [uploadedFile, setUploadedFile] = useState({});  // only applicable for when the uploads where saved in the client
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onFileUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);       // what's appended must match the req.files.file at the backend

        const serverUrl = `http://127.0.0.1:5000`;  // uses this URL to store in the backend's "public" folder

        try {
            const response = await axios.post(`/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: progressEvent => setUploadProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
            });

            const { fileName, filePath } = response.data;
            setUploadedFile({ fileName, filePath });
            // the above is the same as: setUploadedFile({ fileName: response.data.fileName, filePath: response.data.filePath });
            setMessage('File uploaded successfully!');
            setFilename('Select file');
            setTimeout(() => setUploadProgress(0), 5000);
            setTimeout(() => setMessage(''), 5000);

        } catch (e) {
            if(e.response.status === 500) {
                console.log(e);
                setMessage(`Upload failed because there was a problem with the server.`);
            }
            else {
                console.log(e.response.data.message);
                setMessage(e.response.data.message);
            }
        }

    };

    return (
        <Fragment>

            { message ? (<Message message={ message }/>) : null}
            { uploadProgress > 0 ? (<Progress uploadProgress={ uploadProgress }/>) : null }


            <form onSubmit={ onFileUpload } className="my-3">

                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={ onChange } />
                    <label className="custom-file-label" htmlFor="customFile">{ filename }</label>
                </div>

                <input type="submit" value="Upload" className="btn btn-primary btn-block"/>
            </form>








            {/* code below is only applicable for when the uploads are saved in the client*/}

            { uploadedFile ? (<div className="row"> <div className="col-md-6 m-auto">
                    <h3 className="text-center">{ uploadedFile.fileName }</h3>
                    <img src={ uploadedFile.filePath } style={{ maxWidth: '100%', height: 'auto' }}/>
            </div> </div>)
            :  null }

        </Fragment>
    );
}

export default FileUploader;

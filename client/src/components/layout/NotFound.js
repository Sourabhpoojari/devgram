import React,{Fragment} from 'react'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className='x-large text-dark'>
                <i className='fas fa-exclamation-triangle'></i>
                {' '} Page Not Found
            </h1>
            <p className='medium'>
                The page you are looking for is temporarily unavailable.
            </p>
        </Fragment>
    )
}

export default NotFound

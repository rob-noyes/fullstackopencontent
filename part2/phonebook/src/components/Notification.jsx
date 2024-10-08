const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }
    if(status === 404){
        return (
            <div className="error">
                {message}
            </div>
        )
    }
    
    return (
        <div className="success">
            {message}
        </div>
    )
}

export default Notification
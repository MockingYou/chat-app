function Message (props) {
    return (
        <>
            <div className="message">
                <p>
                    <span className="message_name">{props.username}</span>
                    <span className="message_meta">{props.createdAt}</span>
                </p>
                <p>{props.message}</p>
            </div>
        </>
    )
}

export default Message;
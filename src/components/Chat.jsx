const Chat = () => {
    return (
        <div className="w-[60%] mx-auto border h-[60%]">
            <div>
                <h2 className="text-center ">Chat</h2>
            </div>
            <div>
                Body of the chat app
            </div>
            <div className="my-bottom">
                <input type="text" className="input" placeholder="Enter your first name" />
                <button className="btn btn-primary" >Send</button>
            </div>
        </div>
    )
}
export default Chat;
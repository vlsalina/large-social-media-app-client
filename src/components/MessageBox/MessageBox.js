import "./MessageBox.css";

const MessageBox = ({ message }) => {
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
};

export default MessageBox;

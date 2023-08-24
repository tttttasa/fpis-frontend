import { FC } from "react";

import "./Notification.scss";

import { notificationProps } from "../../utils/props";

const Notification: FC<notificationProps> = ({ text, setText }) => {
    return (
        <div className="notification">
            <div
                className="btn"
                onClick={() => {
                    setText("");
                }}
            >
                X
            </div>
            <p>{text}</p>
        </div>
    );
};

export default Notification;

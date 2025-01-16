import React from "react";

interface UserInfoProps {
  sessionData: {
    surgeon: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ sessionData }) => {
  return (
    <div className="flex space-x-8">
      <p>
        Logged in as: <strong>{sessionData.surgeon}</strong>
      </p>
    </div>
  );
};

export default UserInfo;

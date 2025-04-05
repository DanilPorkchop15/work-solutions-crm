import { NavigateFunction, useNavigate } from "react-router-dom";
import { CaretLeftFilled } from "@ant-design/icons";
import { Button, theme } from "antd";

export const Back = () => {
  const navigate: NavigateFunction = useNavigate();
  const { token } = theme.useToken();
  return (
    <Button
      onClick={() => navigate(-1)}
      icon={<CaretLeftFilled />}
      shape="circle"
      style={{
        border: "none",
        boxShadow: token.boxShadow
      }}
    />
  );
};

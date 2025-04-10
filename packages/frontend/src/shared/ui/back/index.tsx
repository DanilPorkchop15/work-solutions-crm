import { NavigateFunction, useNavigate } from "react-router-dom";
import { CaretLeftFilled } from "@ant-design/icons";
import { Button, theme } from "antd";

interface BackProps {
  backUrl?: string;
}

export const Back = ({ backUrl }: BackProps) => {
  const navigate: NavigateFunction = useNavigate();
  const { token } = theme.useToken();
  return (
    <Button
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        // @ts-ignore
        navigate(backUrl ?? -1);
      }}
      icon={<CaretLeftFilled />}
      shape="circle"
      style={{
        border: "none",
        boxShadow: token.boxShadow
      }}
    />
  );
};

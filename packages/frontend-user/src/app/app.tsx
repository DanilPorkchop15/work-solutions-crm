import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {FormControl, ToggleButton, ToggleButtonGroup} from "@mui/material";
import styles from "./app.module.scss";

const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdGFnaW5nIiwiYXVkIjoiY29zdC1tYW5hZ2VtZW50LWNvbXBvbmVudC5icnVzbmlrYS5ydSIsInN1YiI6ImQuYmFsYWJhbkBicnVzbmlrYS5ydSIsImlhdCI6MTcyOTUzODIwMCwiZXhwIjoxNzYxMDc0MjAwfQ.Xrb6jYN4BWJi_aDLcHaALtlIlupfbO5dU7PasTda-iw";


const components = [
  { id: "deviations", label: "Форма Отклонений" },
  { id: "directory", label: "Справочник" }
];

export const App: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const component: string | null = searchParams.get("component");

  useEffect(() => {
    if (!component) {
      const params = new URLSearchParams({
        component: component ?? "deviations"
      });
      setSearchParams(params);
    }
  }, [component, setSearchParams]);

  if (!component) return <div />;

  function handleDevComponentChange(event: React.MouseEvent<HTMLElement>) {
    if ("value" in event.target && typeof event.target.value === "string") {
      searchParams.set("component", event.target.value);
      setSearchParams(searchParams);
    }
  }


  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <FormControl>
          <ToggleButtonGroup value={component} size={"small"} onChange={handleDevComponentChange}>
            {components.map(item => (
              <ToggleButton value={item.id} sx={{ padding: "2px 5px", fontSize: "11px" }} key={item.id}>
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </FormControl>
      </div>
      <div className={styles.component}>
        ПРИВЕТ
        {/*<iframe src="http://localhost:4000" width="100%" height="100%" frameBorder={0}/>*/}
      </div>
    </div>
  );
};

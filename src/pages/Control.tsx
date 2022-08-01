import { memo, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Input, Button } from "../components";
import { serverIP } from "../hooks/useData";

type ExecCommandType = {
  command: string;
};

export const fetchExecCommand = ({ command }: ExecCommandType) => (): Promise<{
  command: string;
}> =>
  fetch(`${serverIP}/exec`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command }),
  }).then(async (res) => {
    const data = await res.json();
    console.log("command result", data);
    return data;
  });

export const useExecCommand = ({ command }: ExecCommandType) =>
  useQuery<any, ExecCommandType>(
    `execCommand_${command}`,
    fetchExecCommand({ command }),
    {
      enabled: command?.length >= 3,
      cacheTime: 30 * 60 * 1000, // 30 min caching
      retry: 1,
    }
  );

export const Control = memo(() => {
  console.info("Render: Control /");

  const [command, setCommand] = useState("ls");
  const execCommand = useExecCommand({ command });

  console.log(execCommand);

  const onExecute = useCallback(() => {
    console.log(`onExecute: '${command}'`);
  }, [command]);

  return (
    <div>
      <h1>Control</h1>

      <Input value={command} type="text" setValue={setCommand} />

      <Button onClick={onExecute}>Execute</Button>
    </div>
  );
});

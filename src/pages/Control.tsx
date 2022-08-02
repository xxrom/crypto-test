import { memo, useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Input, Button, Text, Row, Container } from "../components";
import { serverIP } from "../hooks/useData";

type ExecCommandType = {
  command: string;
};

export const fetchExecCommand = ({
  command,
}: ExecCommandType): Promise<{
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

export const Control = memo(() => {
  console.info("Render: Control /");

  const [command, setCommand] = useState("ls");
  const execMut = useMutation(fetchExecCommand, {
    retry: 1,
  });
  const execCommand = execMut?.mutate;

  console.log(execMut);

  const onExecute = useCallback(() => {
    console.log(`onExecute: '${command}'`);
    execCommand({ command });
    setCommand("");
  }, [command, execCommand]);

  return (
    <Container>
      <Row>
        <Input
          value={command}
          placeholder="command"
          type="text"
          setValue={setCommand}
          onEnter={onExecute}
        />
        <Button onClick={onExecute}>Execute</Button>
      </Row>

      <Text>{execMut?.data}</Text>
    </Container>
  );
});

/*
 * cpu temp: sensors | grep 'CPUTIN'
 *
 */

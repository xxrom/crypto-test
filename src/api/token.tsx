import { useQuery } from "react-query";
import { serverIP } from "../hooks/useData";
import { UserDataType } from "../slices";

type IsTokenValidType = Pick<UserDataType, "token">;

export const fetchIsTokenValid = ({
  token,
}: IsTokenValidType): Promise<{ email: string }> =>
  fetch(`${serverIP}/validate-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  }).then((res) => res.json());

export const useIsTokenValid = (token: string) =>
  useQuery(
    `validate-token_${token}`,
    async () => await fetchIsTokenValid({ token }),
    { enabled: typeof token === "string" && token.length > 4 }
  );

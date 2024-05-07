/* eslint-disable @typescript-eslint/no-unused-vars */
import useRefreshToken from "../hooks/useRefreshToken";
import PauseClock from "../ui/PauseClock";

function Settings() {
  const refresh = useRefreshToken();

  return (
    <>
      <PauseClock />
      <h1>Settings</h1>
      <button onClick={refresh}>refresh</button>
    </>
  );
}

export default Settings;

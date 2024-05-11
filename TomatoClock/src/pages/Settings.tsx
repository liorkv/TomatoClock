/* eslint-disable @typescript-eslint/no-unused-vars */
import useSettings from "../hooks/useSettings";
import PauseClock from "../ui/PauseClock";

function Settings() {
  const { settings, isLoading, error } = useSettings();
  return (
    <>
      <PauseClock />
      <h1>Settings</h1>
      <button
        onClick={() => {
          console.log(settings);
        }}
      >
        settings
      </button>
    </>
  );
}

export default Settings;

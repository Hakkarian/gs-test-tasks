import { FC, FormEvent, useCallback, useMemo, useState } from "react";

import styles from './LookupPage.module.css';

interface Props {
  address: string,
  city: string,
  country: string
  lat: number
  lon: number
  timezone: string
}
interface PropsError {
  [key: string]: string
}
const LookupPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [ipDetails, setIpDetails] = useState<Props | null>(null);
  const [error, setError] = useState<PropsError | null>(null);

  const apiKey = "nwxbeBHL3oMZqwVk1rNl7w==rYhMqJR9Vbb7R5W3";
  const apiURL = "https://api.api-ninjas.com/v1/iplookup?address=";

  console.log(`${apiURL}${ipAddress}`);
  console.log(ipAddress);
  const options = useMemo(() => ({
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  }), [apiKey]);

  const validateIpAddress = useCallback((ipAddress: string) => {
    if (ipAddress.length < 8) {
      setError(prevError => ({ ...prevError, min: 'Minimum length 8' }));
      return false;
    }
    if(ipAddress.length > 16) {
      setError((prevError) => ({ ...prevError, max: "Maximum length 16" }));
      return false;
    }
    if (!/^[0-9.]+$/.test(ipAddress)) {
      setError((prevError) => ({
        ...prevError,
        numberDot: "IP address must contain numbers and dots only",
      }));
      return false;
    }

    return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddress);
  }, []);

  const handleLookup = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      if (validateIpAddress(ipAddress)) {
        console.log('correct')
        setError(null);
        const response = await fetch(
          `https://api.api-ninjas.com/v1/iplookup?address=${ipAddress}`,
          options
        );
        const data = await response.json();
        setIpDetails(data);
        console.log(data);
      } else {
        console.log('wrong')
        setError((prevError) => ({
          ...prevError,
          ip: "Invalid IP address",
        }));
        setIpDetails(null);
      }
      setLoading(false);
    },
    [options, ipAddress, validateIpAddress]
  );
  return (
    <section className={styles.lookup}>
      <form className="input-section" onSubmit={handleLookup}>
        <label>
          <input
            type="text"
            placeholder="Enter IP address..."
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </label>
        <button type="submit" className="submit-btn">
          Find
        </button>
      </form>
      <div className="result-section">
        {error && (
          <div className={styles.error}>
            <p>{error.min || error.max || error.numberDot || error.ip}</p>
          </div>
        )}
        {loading && !ipDetails && <div>Loading, please wait...</div>}
        {ipDetails && (
          <div>
            <p>IP Address: {ipDetails?.address}</p>
            <p>Country: {ipDetails?.country}</p>
            <p>City: {ipDetails?.city}</p>
            <p>Latitude: {ipDetails?.lat}</p>
            <p>Longitude: {ipDetails?.lon}</p>
            <p>Timezone: {ipDetails?.timezone}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LookupPage;

import { useState, useEffect } from "react";
import "./App.css";
import { Loader } from "./components/Loader";
import { ErrorComponent } from "./components/ErrorComponent";
import { Slider } from "./components/Slider";

const CITY = "Oslo,norway";
const APPID = "5e4f0137286bfb8305fbbf443540cafe";

function App() {
    const [data, setData] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!shouldFetch) return;

        setData(null);
        setError(null);
        setIsLoading(true);
        setShouldFetch(false);

        (async () => {
            try {
                const response = await window.fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&APPID=${APPID}&units=metric`
                );
                const resJson = await response.json();
                console.log(resJson);

                if (resJson.cod !== "200") {
                    setIsLoading(false);
                    setError(resJson.message);
                    setData(null);
                    return;
                }

                setError(null);
                setIsLoading(false);
                setData(resJson);
            } catch (err) {
                console.dir(err);
                setError(err);
                setIsLoading(false);
                setData(null);
            }
        })();
    }, [shouldFetch]);

    return (
        <div className="App">
            {error && <ErrorComponent error={error} setShouldFetch={setShouldFetch} />}
            {isLoading && <Loader />}
            {data && <Slider data={data} />}
        </div>
    );
}

export default App;

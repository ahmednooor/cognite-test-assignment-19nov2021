import "./Slide.css";

export const Slide = ({ weatherData, date }) => {
    console.log(weatherData[0]);
    const averageTemp =
        weatherData.reduce((total, item) => {
            return total + item.main.temp;
        }, 0) / weatherData.length;

    return (
        <div className="Slide">
            <div className="card">
                <time dateTime={date}>{date}</time>
                <hr style={{ opacity: 0.3 }} />
                <h2 style={{ margin: "0px", padding: "0px", opacity: 0.7 }}>{averageTemp.toFixed(2)} °C</h2>
                {/* <br /> */}
                <img src={`http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}.png`} alt="" />
                <br />
                <span>{weatherData[0].weather[0].main}</span>
                <br />
                <em>~ {weatherData[0].weather[0].description}</em>
            </div>
            <br />
            <div className="hourly-forecast">
                {weatherData.map((data, index) => {
                    return (
                        <div key={`${index}`} className="hourly-forecast-item">
                            <time dateTime={data.dt_txt.substring(11, 16)}>{data.dt_txt.substring(11, 16)}</time> ~{" "}
                            <span>{data.weather[0].main}</span>
                            <span style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>
                                    <em>Min</em>
                                    <br />
                                    {data.main.temp_min} °C
                                </span>
                                <span>
                                    <em>Max</em>
                                    <br />
                                    {data.main.temp_max} °C
                                </span>
                            </span>
                            <hr style={{ opacity: 0.3 }} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

import "./Slider.css";
import { useState } from "react";
import { Slide } from "./Slide";

export const Slider = ({ data }) => {
    const [weatherByDays, ] = useState(
        (() => {
            if (data === null) return null;

            const byDays = {};

            data.list?.map((item) => {
                const date = item.dt_txt.substring(0, 10);

                if (!Object.keys(byDays).includes(date)) {
                    byDays[date] = [];
                }

                byDays[date].push(item);

                return item;
            });

            // remove first day, since the req. is for next 5 days
            delete byDays[Object.keys(byDays)[0]]; 

            return byDays;
        })()
    );
    const [slideStartIndex, setSlideStartIndex] = useState(0);
    const [numOfSlidesToShow] = useState(3);

    return (
        <div className="Slider">
            <div className="btns-ctr">
                <button
                    onClick={() => {
                        if (slideStartIndex < 1) return;
                        setSlideStartIndex(slideStartIndex - 1);
                    }}
                >
                    🡠
                </button>
                <button
                    onClick={() => {
                        if (slideStartIndex >= Object.keys(weatherByDays).length - numOfSlidesToShow) return;
                        setSlideStartIndex(slideStartIndex + 1);
                    }}
                >
                    🡢
                </button>
            </div>
            <div className="slides-ctr">
                {Object.keys(weatherByDays)
                    .slice(slideStartIndex, slideStartIndex + numOfSlidesToShow)
                    .map((date) => {
                        return <Slide key={date} weatherData={weatherByDays[date]} date={date} />;
                    })}
            </div>
        </div>
    );
};

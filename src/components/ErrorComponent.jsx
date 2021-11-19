import "./ErrorComponent.css";

export const ErrorComponent = ({ error, setShouldFetch }) => {
    return (
        <div className="ErrorComponent">
            <span className="err-text">{error}</span>
            <br />
            <br />
            <button className="try-again-btn" onClick={() => setShouldFetch(true)}>
                Try Again
            </button>
        </div>
    );
};

import './ErrorMessage.css';

function ErrorMessage({ onRetry }) {
    return (
        <div className="error-message">
            <h2>Something went wrong...</h2>
            <button className="error-message__button" onClick={onRetry}>Try again</button>
        </div>
    );
}

export default ErrorMessage;

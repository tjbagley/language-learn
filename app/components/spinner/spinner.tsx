import "./spinner.scss";

export interface SpinnerProps {
  size?: "small" | "large";
}

export function Spinner({ size = "small" }: SpinnerProps) {
  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner-main" role="status" aria-label="Loading"></div>
    </div>
  );
}
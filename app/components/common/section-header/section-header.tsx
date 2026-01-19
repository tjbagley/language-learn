import "./section-header.scss";

export interface SectionHeaderProps {
  heading: string | null | undefined;
  buttonLabel: string;
  onButtonClick?: () => void;
}

export function SectionHeader(props: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h1>{props.heading || ''}</h1>
      <button onClick={props.onButtonClick} type="button">{props.buttonLabel}</button>
    </div>
  );
}
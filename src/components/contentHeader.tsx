import styles from "./contentHeader.module.css";

export const ContentHeader = ({
  text,
  Component = <div></div>,
  style,
}: {
  text: string;
  Component?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={`${styles.cHeader}`}>
      <h1>{text}</h1>
      {Component}
    </div>
  );
};

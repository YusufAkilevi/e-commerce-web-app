import classes from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div className={classes["lds-ring"]} style={{ ...props.style }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;

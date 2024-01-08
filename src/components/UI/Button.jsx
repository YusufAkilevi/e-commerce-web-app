const Button = (props) => {
  const modifiedProps = {
    ...props,
    className: `border px-5 py-2 rounded ${props.className}`,
  };
  return <button {...modifiedProps}>{props.children}</button>;
};

export default Button;

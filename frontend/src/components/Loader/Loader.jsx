function Loader() {
  return (
    <img
      src={import.meta.env.VITE_APP_URL + "/src/assets/images/loaders/7.gif"}
      alt="Loader"
    />
  );
}

export default Loader;

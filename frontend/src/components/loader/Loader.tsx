import { useState } from "react";
import { ClipLoader } from "react-spinners";
import type { CSSProperties } from "react";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}></button>
      <ClipLoader
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;

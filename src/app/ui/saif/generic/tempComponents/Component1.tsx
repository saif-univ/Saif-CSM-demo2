import React from "react";

function Component1({ setItem }) {
  const data = [
    <div>100</div>,
    <div>200</div>,
    <div>300</div>,
    <div>400</div>,
    <div>500</div>,
  ];
  return (
    <div>
      data{" "}
      {data.map((e, i) => {
        return (
          <button
            onClick={() => {
              setItem(e);
            }}
            key={i}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
}

export function Component2({ setItem }) {
  const data = [
    <div>66</div>,
    <div>77</div>,
    <div>88</div>,
    <div>99</div>,
    <div>100</div>,
  ];
  return (
    <div>
      Component 2
      {data.map((e, i) => {
        return (
          <button
            onClick={() => {
              setItem(e);
            }}
            key={i}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
}
export function Component3() {
  return <div>Component3</div>;
}
export function Component4() {
  return <div>Component4</div>;
}
export function Component5() {
  return <div>Component5</div>;
}

export default Component1;

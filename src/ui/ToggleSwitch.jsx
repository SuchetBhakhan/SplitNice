export default function ToggleSwitch({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: "60px",
        height: "30px",
        borderRadius: "15px",
        background: value ? "limegreen" : "lightgray",
        display: "flex",
        alignItems: "center",
        padding: "4px",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          height: "22px",
          width: "22px",
          borderRadius: "50%",
          background: "white",
          transform: value ? "translateX(30px)" : "translateX(0)",
          transition: "0.3s",
        }}
      />
    </div>
  );
}

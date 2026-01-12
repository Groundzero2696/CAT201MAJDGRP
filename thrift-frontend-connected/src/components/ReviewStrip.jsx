export default function ReviewStrip() {
  const reviews = [
    { name: "Aina", text: "Fast delivery and items matched the condition notes.", stars: 5 },
    { name: "Hafiz", text: "Great pricing for thrift finds. The filters are very helpful.", stars: 5 },
    { name: "Mei", text: "Trade-in flow is clear and easy to follow.", stars: 4 },
  ];

  return (
    <div className="reviewStrip">
      {reviews.map((r, i) => (
        <div className="reviewCard" key={i}>
          <div className="stars">
            {"★".repeat(r.stars)}
            {"☆".repeat(5 - r.stars)}
          </div>
          <p style={{ margin: "10px 0", color: "var(--muted)", lineHeight: 1.6 }}>{r.text}</p>
          <div style={{ fontWeight: 800 }}>{r.name}</div>
        </div>
      ))}
    </div>
  );
}

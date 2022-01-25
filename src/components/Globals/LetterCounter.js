export default function LetterCounter({ letters }) {
  return (
    <div className="number-letters-comment">
      <p>{letters ? letters.length : 0}/2000</p>
    </div>
  );
}

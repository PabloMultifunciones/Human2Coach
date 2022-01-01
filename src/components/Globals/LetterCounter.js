export default function LetterCounter({ letters }) {
  return (
    <div className="number-letters-comment">
      <p>{letters ? letters.length : 0}/255</p>
    </div>
  );
}

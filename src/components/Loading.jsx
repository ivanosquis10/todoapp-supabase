export default function Loading({ msg = '', direction = 'center', pdy = '0' }) {
  return (
    <div className={`flex justify-${direction} gap-1 py-${pdy}`}>
      <p className="uppercase font-bold">{msg}</p>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  )
}

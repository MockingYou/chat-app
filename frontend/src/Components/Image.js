function Image({ src, fileName }) {
  return (
    <a href={src} download={fileName} target="_blank" rel="noreferrer">
      <img className="imgSent" src={src} alt={fileName} />
    </a>
  )
}

export default Image
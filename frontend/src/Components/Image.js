import React, { useState, useEffect } from "react";

function Image(props) {
    const [imageSrc, setImageSrc] = useState("")
    useEffect(() => {
        const reader = new FileReader()
        reader.readAsDataURL(props.blob)
        reader.onloadend = function () {
            setImageSrc(reader.result)
        }
    }, [props.blob])
    return (
        <img className="imgSent" src={imageSrc} alt={props.fileName} />
    )
}

export default Image
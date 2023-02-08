import React, { useState, useEffect } from 'react';

const ImageLoader = ({src}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImage(image);
      setLoading(false);
    };
  }, [src]);

  return (
    <>
      {loading ? <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" /> : <img src={src} alt="" />}
    </>
  );
};

export default ImageLoader
import React from 'react';

interface IFrameProps {
  url: string;
}

const FullWidthIframe: React.FC<IFrameProps> = ({ url }) => {
  const iframeStyles: React.CSSProperties = {
    width: '100%',  // Set the width to 100% of the viewport
    height: '100vh', // Set the height to 100% of the viewport height
    border: 'none', // Remove the iframe border
  };

  return (
    <iframe
      src={url}
      frameBorder="0"
      style={iframeStyles}
      title="Embedded Page"
      allowFullScreen
    />
  );
};

export default FullWidthIframe;
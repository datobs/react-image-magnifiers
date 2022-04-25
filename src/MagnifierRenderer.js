import React, { forwardRef } from "react";
import Image from "./Image";
import styles from "./styles";

const MagnifierRenderer = forwardRef((props, ref) => {
  const {
    itemPosition,
    active,
    elementDimensions,
    itemDimensions,
    imageSrc,
    largeImageSrc,
    imageAlt,
    itemRef,
    renderOverlay,
    cursorStyle,
    cursorStyleActive,
    onImageLoad,
    onLargeImageLoad,
    onLoadRefresh
  } = props;

  const legalSize = itemDimensions.width > elementDimensions.width;
  const isActive = legalSize && active;
  const finalCursorStyle = !legalSize
    ? "default"
    : active
    ? cursorStyleActive
    : cursorStyle;

  return (
    <div style={{ position: "relative", cursor: finalCursorStyle }}>
      <Image
        style={{
          display: "block",
          visibility: isActive ? "hidden" : "visible",
          width: "100%"
        }}
        src={imageSrc}
        alt={imageAlt}
        onImageLoad={onImageLoad}
        onLoadRefresh={onLoadRefresh}
        ref={ref}
      />
      <div
        style={styles.getZoomContainerStyle(
          elementDimensions.width,
          elementDimensions.height,
          true
        )}
      >
        <Image
          style={styles.getLargeImageStyle(
            itemPosition.x,
            itemPosition.y,
            isActive
          )}
          src={largeImageSrc || imageSrc}
          alt={imageAlt}
          ref={itemRef}
          onImageLoad={onLargeImageLoad}
          onLoadRefresh={onLoadRefresh}
        />
      </div>
      {renderOverlay ? renderOverlay(active) : null}
    </div>
  );
});

export default MagnifierRenderer;

const convertImageDataToBlobUrl = (mime: string, image: { data: number[] }) => {
  const blob = new Blob([new Uint8Array(image.data)], { type: mime });

  return URL.createObjectURL(blob);
};

export { convertImageDataToBlobUrl };

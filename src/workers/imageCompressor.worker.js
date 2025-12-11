self.onmessage = (e) => {
  const file = e.data;
  if (!file) {
    self.postMessage(null);
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64 = reader.result;

    self.postMessage(base64);
  };

  reader.onerror = () => {
    self.postMessage(null);
  };

  reader.readAsDataURL(file);
};

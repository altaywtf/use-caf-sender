const formatDuration = (duration: number) => {
  const h = Math.floor(duration / 3600);
  const m = Math.floor((duration % 3600) / 60);
  const s = Math.floor(duration % 60);

  const hDisplay = h ? h.toString() : '';
  const mDisplay = m > 9 ? m.toString() : `0${m}`;
  const sDisplay = s > 9 ? s.toString() : `0${s}`;

  return [hDisplay, mDisplay, sDisplay].filter(s => s !== '').join(':');
};

export default formatDuration;

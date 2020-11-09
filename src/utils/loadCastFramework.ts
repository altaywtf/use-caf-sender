const SCRIPT_URL =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

const loadCastFramework = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const senderScript = document.createElement('script');
    senderScript.setAttribute('type', 'text/javascript');
    senderScript.setAttribute('src', SCRIPT_URL);

    document.getElementsByTagName('head')[0].appendChild(senderScript);

    if (window.chrome && window.chrome.cast) {
      resolve();
    }

    // eslint-disable-next-line no-underscore-dangle
    window.__onGCastApiAvailable = (isAvailable: boolean) => {
      if (isAvailable) {
        resolve();
      }

      reject(new Error('Failed to load CastFramework'));
    };
  });

export default loadCastFramework;

'use client';

/**
 * Opens an authentication popup window
 * @param {string} authUrl - The URL to load in the popup (default: '/auth')
 * @param {object} options - Additional options for the popup
 * @returns {Window|null} - Reference to the popup window or null if blocked
 */
export function openAuthPopup(authUrl = '/GoogleAuthPage', options = {}) {
  const {
    width = 500,
    height = 600,
    title = 'Authentication',
    onSuccess = () => {},
    onFailure = () => {},
    onClose = () => {}
  } = options;
  
  // Calculate position to center the popup
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2.5;
  
  // Open the popup
  const popup = window.open(
    authUrl,
    title,
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
  
  if (popup) {
    // Set up event listener for messages from popup
    const messageHandler = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        onSuccess(event.data.data);
        popup.close();
      } else if (event.data.type === 'AUTH_FAILURE') {
        onFailure(event.data.error);
      }
    };

    window.addEventListener('message', messageHandler);
    
    // Handle popup closing
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageHandler);
        onClose();
      }
    }, 500);
    
    return popup;
  } else {
    // Popup was blocked
    console.error('Popup blocked by browser');
    return null;
  }
}

/**
 * Sends a message from the auth popup to the parent window
 * @param {string} type - Message type (e.g., 'AUTH_SUCCESS', 'AUTH_FAILURE')
 * @param {object} data - Data to send with the message
 */
export function sendAuthResult(type, data) {
  if (window.opener) {
    window.opener.postMessage(
      { type, data },
      window.location.origin
    );
  } else {
    console.warn('No opener window found. Not in a popup?');
  }
}
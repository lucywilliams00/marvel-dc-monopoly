const authenticationEventListener = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    },
};

export default authenticationEventListener;

// the way this works in the demo is, the frontend does a call to the backend
// if it throws an error (I think because the auth token is rejected) the user gets logged out
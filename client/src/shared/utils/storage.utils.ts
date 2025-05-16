export function getToken() {
    return localStorage.getItem("token");
}

export function subscribe(listener: () => void) {
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }
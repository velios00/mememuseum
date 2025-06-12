export function logOut(navigateFn: (path: string) => void) {
  localStorage.removeItem("token");
  navigateFn("/login");     //forse qui metto / ?
}
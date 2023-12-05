export function navigationHandler() {
  //Listens to nav elements and prevents profile, quick list new item and signout if no user is logged in
  const profile = document.getElementById("profileNavLink");
  const quickList = document.getElementById("newListing");
  const signOut = document.getElementById("signOut");
  const token = localStorage.getItem("accessToken");

  if (!token) {
    profile.classList.add("d-none");
    quickList.classList.add("d-none");
    signOut.classList.add("d-none");
  }
}

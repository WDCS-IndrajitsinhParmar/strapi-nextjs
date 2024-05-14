import { auth } from "./auth";

export default auth ((req: any) => {
  const { nextUrl } = req;
  const role = req?.auth?.user?.role;
  const isLoggedIn = !!req.auth;

  console.log("Logged In user data from middleware = ", req.auth);

  const path = nextUrl.pathname;
  
  const loginPages = (path=="/admin/login" || path=="/admin/forgot-password" || path.startsWith("/admin/reset-password"));
  const dashboardPages = (path.startsWith("/admin") && !loginPages);
  const protectedPages = (path=="/admin/categories");  

  if (dashboardPages==true && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", nextUrl)); 
  } else if (loginPages==true && isLoggedIn) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
  } else if (role!="admin" && isLoggedIn && protectedPages==true) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
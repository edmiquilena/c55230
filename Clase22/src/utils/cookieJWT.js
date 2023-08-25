const cookieExtrator = (req) => {
  const token = req.cookies.accessToken;

  return token ?? null;
};
export default cookieExtrator;

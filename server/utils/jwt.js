// parse environment variables to integrate with fallback values
const accessTokenExpires = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );

  // Options for cookies
export const accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
    maxAge: accessTokenExpires * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  export const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
  
    // upload session to redis
    redis.set(user._id, JSON.stringify(user));
  
    //   only set secure to true for production
    if (process.env.NODE_ENV === "production") {
      accessTokenOptions.secure = true;
    }
  
    res.cookie("access_token", accessToken, accessTokenOptions);
  
    res.status(statusCode).json({
      success: true,
      user,
      token: accessToken,
    });
  };
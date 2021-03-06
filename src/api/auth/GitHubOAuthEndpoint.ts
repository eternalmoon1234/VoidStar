import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";

export const github = Router();

github.get("/auth/github", (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`
  );
});

github.get("/auth/github/callback", (req: Request, res: Response) => {
  let code = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${code}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;

    res.send(response.data);
  });
});

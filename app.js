import express from 'express';
import cors from 'cors'
import session from 'express-session'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });

app.use(session({
    secret: 'user-management',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.set('view engine','ejs');
app.set('views','views')

export default app
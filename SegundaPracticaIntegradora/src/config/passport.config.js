import passport from "passport";
import GitHubStrategy from 'passport-github2'
import firstCollection from '../models/user.model.js'
import { createHash, isValidPassword } from "../utils.js";



const initializePassport = () => {

    passport.use('github', new GitHubStrategy({
        clientID: "Iv23liLv7VXbYKqgPl8C",
        clientSecret: "64e2ec65522a5cd4cde4a4bb6d32e668281dfb13",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await firstCollection.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 28,
                    email: profile._json.email,
                    password: ""
                }

                if (profile._json.email === 'adminCoder@coder.com') {
                    newUser.rol = 'admin';
                } else {
                    newUser.rol = 'user';
                }

                let result = await firstCollection.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))



    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await firstCollection.findById(id)
        done(null, user)
    })





}


export default initializePassport
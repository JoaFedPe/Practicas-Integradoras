import {Router} from 'express'
import {isAuthenticated, isNotAuthenticated} from '../../middleware/auth.js'
import {passForgotten} from '../../controllers/sessions.controllers.js'

const router = Router()

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login')
})

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register')
})

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', {user: req.session.user})
})

router.get('/current', isAuthenticated, (req, res) => {
    res.render('current', {user: req.session.user})
})

router.get('/passforgotten', (req, res) => {
    res.render('passForgotten')
})

router.post('/passforgotten', passForgotten)

export default router
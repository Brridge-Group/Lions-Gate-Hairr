import Router from 'express'

const router = Router()

let userController = require('../controllers/user-controller')

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/get-profile', userController.getProfileById)

router.post('/:id', userController.updateUser)
//
router.patch('/:id', userController.changeUserRole)

export default router

import jwt from 'jwt-express'
import { ConfigService } from './service/ConfigService'

export const jwt_middleware = jwt.init(ConfigService.JWTToken,{
    cookie: 'jwt-token',
    cookieOptions: { httpOnly: false },
    cookies: true,
    refresh: false,
})
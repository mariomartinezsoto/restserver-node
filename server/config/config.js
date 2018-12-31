//PORT
process.env.PORT = process.env.PORT || 3000

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//DB
if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/cafe'
} else {
    process.env.URLDB = process.env.MONGO_URLDB
}

//TOKEN
process.env.CADUCIDAD_TOKEN = '30d'

//SEED de autenticacion
process.env.SEED = process.env.SEED || 'seed-de-desarrollo'

//GOOGLE
process.env.CLIENT_ID = process.env.CLIENT_ID || '995458413462-aep6569is8favjdtv3lafcrjlcc5u833.apps.googleusercontent.com'
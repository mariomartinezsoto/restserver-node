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
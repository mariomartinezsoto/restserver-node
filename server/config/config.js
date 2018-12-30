//PORT
process.env.PORT = process.env.PORT || 3000

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//DB
if (process.env.NODE_ENV === 'dev') {
    process.env.URLDB = 'mongodb://localhost:27017/cafe'
} else {
    process.env.URLDB = 'mongodb://cafe-user:sixbell.1200@ds127962.mlab.com:27962/cafe'
}
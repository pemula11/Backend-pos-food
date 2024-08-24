const mysql = require("mysql2")
const fs = require("fs")
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');


// Load .env variables
require("dotenv").config()

// Read SQL seed query
const seedQuery = "INSERT INTO Product (uid, name, price, stock, description) VALUES (?, ?, ?, ?, ?)"

// Connect to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true, // IMPORTANT
})

connection.connect()

// generate name

const name_dict = ["Roti", "Soto", "Sate", "Ayam", "Bakso"]
const city_dict = ["Jakarta", "Bandung", "Surabaya", "Semarang", "Yogyakarta"]
const price_dict = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]
const stock_dict = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
const description_dict = ["Enak", "Gurih", "Pedas", "Manis", "Asin"]




console.log("Running SQL seed...")

for (let i = 0; i < 15; i++) {

    const generateName = () => {
        return `${name_dict[Math.floor(Math.random() * name_dict.length)]} ${city_dict[Math.floor(Math.random() * city_dict.length)]}`
      }
      
      const generatePrice = () => {
        return price_dict[Math.floor(Math.random() * price_dict.length)]
      }
      
      const generateStock = () => {
        return stock_dict[Math.floor(Math.random() * stock_dict.length)]
      }
      
      const generateDescription = () => {
        return description_dict[Math.floor(Math.random() * description_dict.length)]
      }
      
      const id = uuidv4()

        // Run seed query
        connection.query(seedQuery, [id, generateName(), generatePrice(), generateStock(), generateDescription()], err => {
            if (err) {
            throw err
            }
        
            
        })
}
console.log("SQL seed completed! Password for initial admin account: ")
connection.end()